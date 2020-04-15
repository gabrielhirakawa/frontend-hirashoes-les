import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Container, Content, Cards, CardItem, AddCard, FormNewCard, SaveCard } from './styles';

import apiNode from '../../services/api-node';
import Menu from '../../components/Menu';
import visa from '../../assets/card-visa.jpg';
import master from '../../assets/card-master.jpg';

export default function CardsPage() {

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        async function loadData() {
            const resp = await apiNode.get(`/${user_id}/cartoes`).catch(e => toast.error('Erro ao buscar cartões'));

            setArrayCards(resp.data);
        }
        loadData();
    }, []);

    const [newCardVisible, setNewCardVisible] = useState(false);
    const [arrayCards, setArrayCards] = useState([]);

    return (
        <Container>
            <Menu />
            <Content>
                <h1>Meus cartões</h1>
                <Cards>
                    {
                        arrayCards.map(item => (
                            <CardItem>
                                <span>{item.numero}</span>
                                <span>{item.nome_impresso}</span>
                                <span>{item.data_expiracao}</span>
                                <img src={item.bandeira === 'master' ? master : visa} />
                            </CardItem>
                        ))
                    }
                    {/* <CardItem>
                        <span>
                            **** **** **** 2890
                    </span>
                        <img src={visa} />
                    </CardItem>
                    <CardItem>
                        <span>
                            **** **** **** 1429
                    </span>
                        <img src={master} />
                    </CardItem> */}
                </Cards>
                <AddCard onClick={() => setNewCardVisible(1)}>Adicionar novo</AddCard>
                {
                    newCardVisible ?
                        (<FormNewCard>
                            <input type="text" placeholder="Card Number" />
                            <div>
                                <input type="text" placeholder="CVV" />
                                <input type="date" placeholder="Expiry Date" />
                            </div>
                            <input type="text" placeholder="Name on Card" />
                            <SaveCard>Salvar Cartão</SaveCard>
                        </FormNewCard>)
                        :
                        (<></>)
                }
            </Content>
        </Container>
    );
}
