import React, { useState } from 'react';

import { Container, Content, PaymentArea, PaymentRadio, TwoCards, Card, SaveCard, PayButton, PayButtonTwoCards, CardsQuantity } from './styles';
import Menu from '../../components/Menu';

export default function Payment() {

    const [twoCards, setTwoCards] = useState(false);
    const [buttonText, setButtonText] = useState("2 Cartões");

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
                            <input type="radio" checked value="Cartao" name="payment" />
                            <label>Cartão</label>
                        </div>
                    </PaymentRadio>
                    <CardsQuantity>
                        <button type="button" onClick={() => {
                            if (buttonText === "2 Cartões") {
                                setButtonText("1 Cartão")
                            }
                            else {
                                setButtonText("2 Cartões")
                            }
                            setTwoCards(!twoCards);
                        }}>{`Usar ${buttonText}`}</button>
                    </CardsQuantity>
                    {
                        twoCards ?
                            <>
                                <TwoCards>
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
                                    </Card>
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


                                    </Card>

                                </TwoCards>
                                <PayButtonTwoCards>Realizar pagamento</PayButtonTwoCards>
                            </>
                            :

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
                    }


                </PaymentArea>
            </Content>
        </Container>
    );
}
