import React from 'react';

import { Container, Content, PaymentArea, PaymentRadio, Card, SaveCard, PayButton } from './styles';
import Menu from '../../components/Menu';

export default function Payment() {
    return (
        <Container>
            <Menu />
            <Content>
                <h1>Finalizar pedido</h1>
                <PaymentArea>
                    <PaymentRadio>
                        <div>
                            <input type="radio" value="Boleto" name="payment" />
                            <label>Boleto</label>
                        </div>
                        <div>
                            <input type="radio" value="Cartao" name="payment" />
                            <label>Cartão</label>
                        </div>
                    </PaymentRadio>
                    <Card>
                        <input type="text" placeholder="Card Number" />
                        <div>
                            <input type="text" placeholder="CVV" />
                            <input type="date" placeholder="Expiry Date" />
                        </div>
                        <input type="text" placeholder="Name on Card" />
                        <select>
                            <option>1x de 499,80 sem juros</option>
                            <option>2x de 249,90 sem juros</option>
                            <option>3x de 166,60 sem juros</option>
                            <option>4x de 124,95 sem juros</option>
                        </select>
                        <SaveCard>
                            <input type="checkbox" />
                            <label>Salvar Cartão</label>
                        </SaveCard>
                        
                        <PayButton>Realizar pagamento</PayButton>
                    </Card>

                </PaymentArea>
            </Content>
        </Container>
    );
}
