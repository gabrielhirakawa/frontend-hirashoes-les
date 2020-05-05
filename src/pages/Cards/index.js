import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { findBrand } from 'creditcard-identifier';

import { Container, Content, Cards, Card, CardItem, AddCard, FormNewCard, SaveCard } from './styles';

import apiNode from '../../services/api-node';
import Menu from '../../components/Menu';
import visa from '../../assets/card-visa.jpg';
import master from '../../assets/card-master.jpg';

export default function CardsPage() {

    const user_id = localStorage.getItem('user_id');
    const [newCardVisible, setNewCardVisible] = useState(false);
    const [arrayCards, setArrayCards] = useState([]);

    //new card
    const [nomeImpresso, setNomeImpresso] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [anoCartao, setAnoCartao] = useState('');
    const [mesCartao, setMesCartao] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        async function loadData() {
            const resp = await apiNode.get(`/${user_id}/cartoes`).catch(e => toast.error('Erro ao buscar cartões'));

            setArrayCards(resp.data);
        }
        loadData();
    }, []);


    async function saveCard(e) {
        e.preventDefault();
        var brand = null;
        try{
            brand = findBrand(numeroCartao);
        }
        catch(e){
            toast.error('Cartão não identificado');
            return;
        }
        
        const card = {
            numero: numeroCartao,
            cvv: cvv,
            nome_impresso: nomeImpresso,
            data_expiracao: `${mesCartao}/${anoCartao}`,
            bandeira: brand
        }
        const resp = await apiNode.post(`/${user_id}/cartoes`, card).catch(e => toast.error('Erro ao salvar cartão'));

        const { data } = resp;

        if (data) {
            toast.success('Cartão inserido com sucesso!');
            window.location.reload();

        }
    }

    async function removeCard(cartaoId) {
        const resp = await apiNode.delete(`/${user_id}/cartoes/${cartaoId}`).catch(e => toast.error('Erro ao remover cartão'));

        const { data } = resp;

        if (data) {
            toast.success('Cartão removido com sucesso!');
            window.location.reload();
        }
    }


    return (
        <Container>
            <Menu />
            <Content>
                <h1>Meus cartões</h1>
                {
                    arrayCards ?
                        (<Cards>
                            {
                                arrayCards.map(item => (
                                    <Card  key={item.id}>
                                        <CardItem>
                                            <span>{item.numero}</span>
                                            <span>{item.nome_impresso}</span>
                                            <span>{item.data_expiracao}</span>
                                            <img src={item.bandeira === 'master' ? master : visa} />
                                        </CardItem>
                                        <FaTrash size={20} onClick={() => removeCard(item.id)} />
                                    </Card>
                                ))
                            }

                        </Cards>)
                        :
                        (<></>)
                }
                <AddCard onClick={() => setNewCardVisible(1)}>Adicionar novo</AddCard>
                {
                    newCardVisible ?
                        (<FormNewCard onSubmit={saveCard}>
                            <input required value={numeroCartao} maxLength={16} onChange={e => setNumeroCartao(e.target.value)} placeholder="Card Number" />
                            <div>
                                <input required value={cvv} maxLength={3} onChange={e => setCvv(e.target.value)} placeholder="CVV" />
                                <input required value={mesCartao} maxLength={2} onChange={e => setMesCartao(e.target.value)} placeholder="Mês" />
                                <input required value={anoCartao} maxLength={4} onChange={e => setAnoCartao(e.target.value)} placeholder="Ano" />
                            </div>
                            <input required value={nomeImpresso} onChange={e => setNomeImpresso(e.target.value)} placeholder="Name on Card" />
                            <SaveCard type="submit">Salvar Cartão</SaveCard>
                        </FormNewCard>)
                        :
                        (<></>)
                }
            </Content>
        </Container>
    );
}
