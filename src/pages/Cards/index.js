import React, { useState } from 'react';

import { Container, Content, Cards, CardItem, AddCard, FormNewCard, SaveCard } from './styles';
import Menu from '../../components/Menu';
import visa from '../../assets/card-visa.jpg';
import master from '../../assets/card-master.jpg';

export default function CardsPage() {

    const [newCardVisible, setNewCardVisible] = useState(false);

    return (
        <Container>
            <Menu />
            <Content>
                <h1>Meus cartões</h1>
                <Cards>
                    <CardItem>
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
                    </CardItem>
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
