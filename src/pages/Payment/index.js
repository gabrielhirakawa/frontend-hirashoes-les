import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
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
    DivCupom,
    FormEndereco,
    Cep,
    Enderecos,
    Separator
} from './styles';
import Menu from '../../components/Menu';

export default function Payment({ history }) {

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
    const [totalCompras, setTotalCompras] = useState(0);
    const [cupom, setCupom] = useState('');
    const [cupomValor, setCupomValor] = useState(0);
    const [enderecosCadastrados, setEnderecosCadastrados] = useState([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState('new');
    const [frete, setFrete] = useState(10);
    const [produtosCart, setProdutosCart] = useState([]);

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

    // carrega informações iniciais
    useEffect(() => {
        async function loadEnderecos() {
            //busca endereço cadastrado
            const resp = await apiNode.get(`/${1}/enderecos`).catch(e => toast.error('Não foi possível carregar endereços'));
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
            setTotalCompras(valor + frete);
            setTotal(valor + frete);
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

        // cadastrar novo endereço
        if (enderecoSelecionado === 'new') {
            if (!cep || !numero) {
                toast.error('Preencha todos campos do endereço!')
                return;
            }
            const resp = await apiNode.post(`/${1}/enderecos`, {
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
        let resp = await apiNode.post(`/${1}/cartoes`, {
            numero: numeroCartao1,
            cvv: ccvCartao1,
            nome_impresso: nomeCartao1,
            data_expiracao: `${mesCartao1}/${anoCartao1}`,
            bandeira: 'master'
        });

        const idCard1 = resp.data.cartao.id;

        resp = await apiNode.post(`/${1}/cartoes`, {
            numero: numeroCartao2,
            cvv: ccvCartao2,
            nome_impresso: nomeCartao2,
            data_expiracao: `${mesCartao2}/${anoCartao2}`,
            bandeira: 'visa'
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

        const payload = {
            user_id: 1,
            endereco_id: idEndereco,
            frete,
            tipo: 'cartao',
            total: totalCompras,
            total_com_desconto: total,
            desconto: cupomValor ? cupomValor : 0,
            cartoes: [
                {
                    cartao_id: idCard1,
                    valor: valorCartao1 ? valorCartao1 : Math.round(total / 2)
                },
                {
                    cartao_id: idCard2,
                    valor: valorCartao2 ? valorCartao2 : Math.round(total / 2)
                }
            ],
            produtos: produtosTratados,
        }

        const response = await apiNode.post('/pedidos', payload).catch(e => toast.error('erro ao processar'));

        const { data } = response;
        
        if(data.pedido){
            history.push(`/payment/${data.pedido.codigo}`)
        }

    }

    async function buscaCupom() {

        if (cupomValor) {
            toast.warn('Só é possível usar apenas um cupom por compra');
            return;
        }

        const resp = await apiNode.get(`/cupons/${cupom.toUpperCase()}`).catch(e => {
            toast.warn('Houve um problema ao buscar cupom');
            return;
        }
        );
        if (resp.data.error) {
            toast.warn('Cupom não encontrado');
            return;
        }

        const { status, valor, tipo } = resp.data;

        if (status !== 'ativo') {
            toast.warn('Cupom expirado');
            return;
        }

        if (tipo === 'promocional') {
            toast.success('Cupom adicionado com sucesso')
            setCupomValor(valor);
            setTotal(total - valor);
        }




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
                            <input value={numeroCartao1} onChange={e => setNumeroCartao1(e.target.value)} type="text" placeholder="Card Number" />
                            <DivExpirationCard>
                                <input value={ccvCartao1} onChange={e => setCcvCartao1(e.target.value)} type="text" placeholder="CVV" />
                                <input value={mesCartao1} onChange={e => setMesCartao1(e.target.value)} type="text" placeholder="Mês" />
                                <input value={anoCartao1} onChange={e => setAnoCartao1(e.target.value)} type="text" placeholder="Ano" />
                            </DivExpirationCard>
                            <input value={nomeCartao1} onChange={e => setNomeCartao1(e.target.value)} type="text" placeholder="Name on Card" />
                            <select value={valorCartao1} onChange={e => setValorCartao1(e.target.value)}>
                                <option value={Math.round(total / 2)}>{`1x de R$ ${(total / 2)}`}</option>
                                <option value={Math.round((total / 2) / 2)}>{`2x de R$ ${((total / 2) / 2).toFixed(2)}`}</option>
                                <option value={Math.round((total / 2) / 3)}>{`3x de R$ ${((total / 2) / 3).toFixed(2)}`}</option>
                                <option value={Math.round((total / 2) / 4)}>{`4x de R$ ${((total / 2) / 4).toFixed(2)}`}</option>
                            </select>

                        </Card>

                        <Card>
                            <input value={numeroCartao2} onChange={e => setNumeroCartao2(e.target.value)} type="text" placeholder="Card Number" />
                            <DivExpirationCard>
                                <input value={ccvCartao2} onChange={e => setCcvCartao2(e.target.value)} type="text" placeholder="CVV" />
                                <input value={mesCartao2} onChange={e => setMesCartao2(e.target.value)} type="text" placeholder="Mês" />
                                <input value={anoCartao2} onChange={e => setAnoCartao2(e.target.value)} type="text" placeholder="Ano" />
                            </DivExpirationCard>
                            <input value={nomeCartao2} onChange={e => setNomeCartao2(e.target.value)} type="text" placeholder="Name on Card" />
                            <select value={valorCartao2} onChange={e => setValorCartao2(e.target.value)}>
                                <option value={Math.round((total / 2))}>{`1x de R$ ${(total / 2)}`}</option>
                                <option value={Math.round((total / 2) / 2)}>{`2x de R$ ${((total / 2) / 2).toFixed(2)}`}</option>
                                <option value={Math.round((total / 2) / 3)}>{`3x de R$ ${((total / 2) / 3).toFixed(2)}`}</option>
                                <option value={Math.round((total / 2) / 4)}>{`4x de R$ ${((total / 2) / 4).toFixed(2)}`}</option>
                            </select>

                        </Card>
                    </TwoCards>

                    <Separator />
                    <DivCupom>
                        <input value={cupom} onChange={e => setCupom(e.target.value)} type="text" placeholder="Cupom" />
                        <button type="button" onClick={() => buscaCupom()} ><FaSearch size={16} color="#fff" /></button>
                    </DivCupom>
                    <LabelTotal>Total {`R$ ${total},00`}</LabelTotal>
                    <span>Frete {`R$ ${frete},00`}</span>
                    <span>Desconto {`R$ ${cupomValor},00`}</span>
                    <PayButton type='button' onClick={() => finalizarCompra()}>Realizar pagamento</PayButton>

                </PaymentArea>
            </Content>
        </Container>
    );
}
