import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { findBrand } from 'creditcard-identifier';
import { toast } from 'react-toastify';

import api from 'axios';
import apiNode from '../../services/api-node';


import {
    Container,
    Content,
    PaymentArea,
    PaymentRadio,
    TwoCards,
    Card,
    SaveCard,
    LabelTotal,
    PayButton,
    PayButtonTwoCards,
    CardsQuantity,
    DivExpirationCard,
    DivCupons,
    DivCupom,
    FormEndereco,
    Cep,
    Enderecos,
    Separator
} from './styles';
import Menu from '../../components/Menu';

export default function Payment({ history }) {

    const user_id = localStorage.getItem('user_id');

    //endereco
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');

    // auxiliar
    const [total, setTotal] = useState(0);
    const [totalInicial, setTotalInicial] = useState(0);
    const [totalComFrete, setTotalComFrete] = useState(0);
    const [enderecosCadastrados, setEnderecosCadastrados] = useState([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState('new');
    const [frete, setFrete] = useState(10);
    const [produtosCart, setProdutosCart] = useState([]);

    //cupons
    const [cupons, setCupons] = useState([]);
    const [tipoCupom, setTipoCupom] = useState('');
    const [recalcularCupom, setRecalcularCupom] = useState(false);
    const [cupomTroca, setCupomTroca] = useState(0);
    const [cupomPromocional, setCupomPromocional] = useState('');
    const [cupomPromocionalValor, setCupomPromocionalValor] = useState(0);
    const [valorCupomSelecionado, setValorCupomSelecionado] = useState(0);

    // cartoes
    const [numeroCartao1, setNumeroCartao1] = useState('');
    const [nomeCartao1, setNomeCartao1] = useState('');
    const [ccvCartao1, setCcvCartao1] = useState('');
    const [mesCartao1, setMesCartao1] = useState('');
    const [anoCartao1, setAnoCartao1] = useState('');
    const [valorCartao1, setValorCartao1] = useState(0);

    const [numeroCartao2, setNumeroCartao2] = useState('');
    const [nomeCartao2, setNomeCartao2] = useState('');
    const [ccvCartao2, setCcvCartao2] = useState('');
    const [mesCartao2, setMesCartao2] = useState('');
    const [anoCartao2, setAnoCartao2] = useState('');
    const [valorCartao2, setValorCartao2] = useState(0);

    useEffect(() => {
        var val = 0;
        if(tipoCupom === 'promocional'){
            val = totalInicial * (Number(cupomPromocionalValor)/100); 
            setValorCupomSelecionado(val);
        }
        if(tipoCupom === 'troca'){
            val = Number(cupomTroca);
            setValorCupomSelecionado(val)
        }
        if(tipoCupom === 'nenhum'){
            setValorCupomSelecionado(0)
        }
        
        setTotal(totalComFrete - val);
        
    }, [recalcularCupom, tipoCupom])

    // carrega informações iniciais
    useEffect(() => {
        async function loadEnderecos() {
            //busca endereço cadastrado
            const resp = await apiNode.get(`/${user_id}/enderecos`).catch(e => toast.error('Não foi possível carregar endereços'));

            const user = await apiNode.get(`/users/${user_id}`).catch(e => toast.error('Erro ao buscar dados'));

            if (user.data) {
                setCupons(user.data.cupons);
            }
            setEnderecosCadastrados(resp.data);
        }
        loadEnderecos();

        // busca carrinho no local storage e calcula produtos * quantidade + frete
        const cartStorage = localStorage.getItem('carrinho');
        if (cartStorage) {
            const cart = JSON.parse(cartStorage);
            let valor = 0;
            cart.map(item => {

                valor += item.preco * item.qtdeCarrinho;
            });

            setProdutosCart(cart);
            setTotalComFrete(valor + frete);
            setTotal(valor + frete);
            setTotalInicial(valor);
        }
    }, []);

    // verificar qual endereco esta selecionado
    useEffect(() => {

        if (enderecoSelecionado === 'new') {
            setRua('');
            setBairro('');
            setNumero('');
            setCep('');
            setEstado('');
            setCidade('');
            setPais('');
            setComplemento('');
        }

        if (enderecosCadastrados) {
            enderecosCadastrados.map(item => {
                if (item.id === enderecoSelecionado) {
                    setRua(item.rua);
                    setBairro(item.bairro);
                    setNumero(item.numero);
                    setCep(item.cep);
                    setEstado(item.estado);
                    setCidade(item.cidade);
                    setPais(item.pais);
                    setComplemento(item.complemento);
                }

            });
        }
    }, [enderecoSelecionado]);

    async function loadCEP() {

        if (cep.length < 8) {
            toast.error("CEP inválido!")
        }

        const resp = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { data } = resp;
        setCidade(data.localidade);
        setEstado(data.uf);
        setRua(data.logradouro);
        setBairro(data.bairro);
        setPais('Brasil');
    }

    async function finalizarCompra() {
        let idEndereco = enderecoSelecionado;

        var brand1 = null;
        var brand2 = null;
        try {
            brand1 = findBrand(numeroCartao1);
            brand2 = findBrand(numeroCartao2);
        }
        catch (e) {
            toast.error('Cartão não identificado');
            return;
        }

        // cadastrar novo endereço
        if (enderecoSelecionado === 'new') {
            if (!cep || !numero) {
                toast.error('Preencha todos campos do endereço!')
                return;
            }
            const resp = await apiNode.post(`/${user_id}/enderecos`, {
                cep,
                rua,
                numero,
                bairro,
                complemento,
                cidade,
                estado,
                pais
            });

            idEndereco = resp.data.endereco.id;
        }

        //valida campos
        if (!numeroCartao1 || !ccvCartao1 || !mesCartao1 || !anoCartao1 || !nomeCartao1) {
            toast.error('Preencha todos campos do cartão 1!')
            return;
        }

        //valida campos
        if (!numeroCartao2 || !ccvCartao2 || !mesCartao2 || !anoCartao2 || !nomeCartao2) {
            toast.error('Preencha todos campos do cartão 2!')
            return;
        }

        //cadastra cartão
        let resp = await apiNode.post(`/${user_id}/cartoes`, {
            numero: numeroCartao1,
            cvv: ccvCartao1,
            nome_impresso: nomeCartao1,
            data_expiracao: `${mesCartao1}/${anoCartao1}`,
            bandeira: brand1
        });

        const idCard1 = resp.data.cartao.id;

        resp = await apiNode.post(`/${user_id}/cartoes`, {
            numero: numeroCartao2,
            cvv: ccvCartao2,
            nome_impresso: nomeCartao2,
            data_expiracao: `${mesCartao2}/${anoCartao2}`,
            bandeira: brand2
        });

        const idCard2 = resp.data.cartao.id;


        //monta payload produtos
        let produtosTratados = [];
        produtosCart.map(item => {
            produtosTratados.push({
                produto_id: item.id,
                quantidade: item.qtdeCarrinho
            });
        });

        //calcula valor selecionado 
        const parcelasCartao1 = valorCartao1 ? valorCartao1 : 1
        const parcelasCartao2 = valorCartao2 ? valorCartao1 : 1
        const totalCartao1 = valorCartao1 ? ((total / 2) / valorCartao1).toFixed(2) : ((total / 2)).toFixed(2)
        const totalCartao2 = valorCartao2 ? ((total / 2) / valorCartao2).toFixed(2) : ((total / 2)).toFixed(2)

        const payload = {
            user_id: user_id,
            endereco_id: idEndereco,
            frete,
            tipo: 'cartao',
            total: totalInicial,
            total_com_desconto: total,
            // desconto: cupomValor ? cupomValor : 0,
            cartoes: [
                {
                    cartao_id: idCard1,
                    parcelas: parcelasCartao1,
                    valor: totalCartao1
                },
                {
                    cartao_id: idCard2,
                    parcelas: parcelasCartao2,
                    valor: totalCartao2
                }
            ],
            produtos: produtosTratados,
        }

        const response = await apiNode.post('/pedidos', payload).catch(e => toast.error('erro ao processar'));

        const { data } = response;

        if (data.pedido) {
            history.push(`/payment/${data.pedido.codigo}`)
        }

    }

    async function buscaCupom() {

        const resp = await apiNode.get(`/cupons/${cupomPromocional}`).catch(e => {
            toast.warn('Houve um problema ao buscar cupom');
            return;
        }
        );
        if (resp.data.error) {
            toast.warn('Cupom não encontrado');
            return;
        }

        const { status, percentual_desconto } = resp.data;

        if (status !== 'ativo') {
            toast.warn('Cupom expirado');
            return;
        }


        toast.success('Cupom encontrado com sucesso!');
        setCupomPromocionalValor(percentual_desconto);
        setRecalcularCupom(!recalcularCupom);


    }



    return (
        <Container>
            <Menu />
            <Content>
                <h1>Finalizar pedido</h1>

                <PaymentArea>
                    <h3>1 - Selecione Endereço</h3>
                    {
                        enderecosCadastrados ?
                            (<Enderecos>
                                {
                                    enderecosCadastrados.map(item => (
                                        <li key={item.id}>
                                            <input type="radio" name="address" onChange={() => setEnderecoSelecionado(item.id)} />
                                            <span>{`${item.rua}, ${item.numero} - ${item.bairro}, ${item.estado}`}</span>
                                        </li>
                                    ))
                                }
                                <li>
                                    <input type="radio" name="address" onChange={() => setEnderecoSelecionado('new')} />
                                    <span>Cadastrar novo</span>
                                </li>

                            </Enderecos>)
                            :
                            (<></>)
                    }
                    <FormEndereco>
                        <Cep>
                            <input type="text" required maxLength="8" value={cep} onChange={e => setCep(e.target.value)} placeholder="Digite seu CEP *" />
                            <button type="button" onClick={() => loadCEP()}><FaSearch size={16} color="#fff" /></button>
                        </Cep>
                        <input type="text" required value={rua} onChange={e => setRua(e.target.value)} placeholder="Rua *" />
                        <div>
                            <input type="text" required value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número *" />
                            <input type="text" required value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro *" />
                        </div>
                        <input type="text" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Complemento" />
                        <input type="text" required value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade *" />
                        <input type="text" required value={estado} onChange={e => setEstado(e.target.value)} placeholder="Estado *" />
                        <input type="text" required value={pais} onChange={e => setPais(e.target.value)} placeholder="País *" />
                    </FormEndereco>
                    <Separator />

                    <h3>2 - Pague em até 2 cartões!</h3>
                    <TwoCards>
                        <Card>
                            <input required maxLength={16} value={numeroCartao1} onChange={e => setNumeroCartao1(e.target.value)} type="text" placeholder="Card Number" />
                            <DivExpirationCard>
                                <input required maxLength={3} value={ccvCartao1} onChange={e => setCcvCartao1(e.target.value)} type="text" placeholder="CVV" />
                                <input required maxLength={2} value={mesCartao1} onChange={e => setMesCartao1(e.target.value)} type="text" placeholder="Mês" />
                                <input required maxLength={4} value={anoCartao1} onChange={e => setAnoCartao1(e.target.value)} type="text" placeholder="Ano" />
                            </DivExpirationCard>
                            <input required value={nomeCartao1} onChange={e => setNomeCartao1(e.target.value)} type="text" placeholder="Name on Card" />
                            <select value={valorCartao1} onChange={e => setValorCartao1(e.target.value)}>
                                <option value={1}>{`1x de R$ ${(total / 2).toFixed(2)}`}</option>
                                <option value={2}>{`2x de R$ ${((total / 2) / 2).toFixed(2)}`}</option>
                                <option value={3}>{`3x de R$ ${((total / 2) / 3).toFixed(2)}`}</option>
                                <option value={4}>{`4x de R$ ${((total / 2) / 4).toFixed(2)}`}</option>
                            </select>

                        </Card>

                        <Card>
                            <input required maxLength={16} value={numeroCartao2} onChange={e => setNumeroCartao2(e.target.value)} type="text" placeholder="Card Number" />
                            <DivExpirationCard>
                                <input required maxLength={3} value={ccvCartao2} onChange={e => setCcvCartao2(e.target.value)} type="text" placeholder="CVV" />
                                <input required maxLength={2} value={mesCartao2} onChange={e => setMesCartao2(e.target.value)} type="text" placeholder="Mês" />
                                <input required maxLength={4} value={anoCartao2} onChange={e => setAnoCartao2(e.target.value)} type="text" placeholder="Ano" />
                            </DivExpirationCard>
                            <input required value={nomeCartao2} onChange={e => setNomeCartao2(e.target.value)} type="text" placeholder="Name on Card" />
                            <select value={valorCartao2} onChange={e => setValorCartao2(e.target.value)}>
                                <option value={1}>{`1x de R$ ${(total / 2).toFixed(2)}`}</option>
                                <option value={2}>{`2x de R$ ${((total / 2) / 2).toFixed(2)}`}</option>
                                <option value={3}>{`3x de R$ ${((total / 2) / 3).toFixed(2)}`}</option>
                                <option value={4}>{`4x de R$ ${((total / 2) / 4).toFixed(2)}`}</option>
                            </select>

                        </Card>
                    </TwoCards>

                    <Separator />
                    <h3>3 - Cupons</h3>
                    <DivCupons>
                        <div>
                            <div>
                                <input onChange={() => setTipoCupom('promocional')} type="radio" name="cupons" />
                                <label>Usar Cupom promocional</label>
                            </div>
                            <DivCupom>
                                <input value={cupomPromocional} onChange={e => setCupomPromocional(e.target.value)} type="text" placeholder="Cupom Promocional" />
                                <button type="button" onClick={() => {
                                    buscaCupom();
                                    }} ><FaSearch size={16} color="#fff" /></button>
                            </DivCupom>
                            {
                                cupomPromocionalValor ?
                                (<label><strong>Cupom: </strong>{`${cupomPromocionalValor}% de desconto = ${(totalInicial * (cupomPromocionalValor/100)).toFixed(2)}`}</label>)
                                :
                                (<></>)
                            }
                        </div>
                        <div>
                            <div>
                                <input onChange={() => setTipoCupom('troca')} type="radio" name="cupons" />
                                <label>Usar Cupom de troca</label>

                            </div>
                            <select defaultValue={cupomTroca} onChange={e => {
                                setCupomTroca(e.target.value);
                                setRecalcularCupom(!recalcularCupom);
                            }}>
                                <option value={0}>-- Selecione um cupom --</option>
                                {
                                    cupons.map(item => {
                                        if (!item.utilizado) {
                                            return <option value={item.valor} key={item.id}>{`${item.codigo} - ${item.valor.toFixed(2)}`}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <div>
                                <input onChange={() => setTipoCupom('nenhum')} type="radio" name="cupons" />
                                <label>Não usar cupom</label>
                            </div>
                        </div>
                    </DivCupons>
                    <Separator />
                    <span>Total carrinho {`R$ ${totalInicial.toFixed(2)}`}</span>
                    <span> - Desconto {`R$ ${valorCupomSelecionado.toFixed(2)}`}</span>
                    <span> + Frete {`R$ ${frete.toFixed(2)}`}</span>
                    <LabelTotal>Total {`R$ ${total.toFixed(2)}`}</LabelTotal>
                    
                    <PayButton type='button' onClick={() => finalizarCompra()}>Realizar pagamento</PayButton>

                </PaymentArea>
            </Content>
        </Container>
    );
}
