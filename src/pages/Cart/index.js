import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Content, MyCart, Item, Total, ButtonFinalizar } from './styles';
import Menu from '../../components/Menu';
import airforce from '../../assets/airforce.jpg'
import airmax from '../../assets/airmax.png'

export default function Cart() {
    return (
        <Container>
            <Menu />
            <Content>
                <h1><FaShoppingCart /> Meu carrinho </h1>

                <MyCart>
                    <Item>
                        <li>
                            <img src={airforce} alt="tenis" />
                            <span>Tênis Air Force 1</span>

                            <input placeholder="Qtd" type="number" />
                            <span>Remover item</span>
                            <span>RS$ 249,90</span>
                        </li>
                        <li>
                            <img src={airmax} alt="tenis" />
                            <span>Tênis Air Max 90</span>

                            <input placeholder="Qtd" type="number" />
                            <span>Remover item</span>
                            <span>RS$ 249,90</span>
                        </li>
                    </Item>
                    <Total>
                        <span>Total:</span>
                        <span>R$ 499,80</span>
                    </Total>

                    <Link to="/payment">
                        <ButtonFinalizar>
                            Finalizar Pedido
                        </ButtonFinalizar>
                    </Link>

                </MyCart>
            </Content>
        </Container>
    );
}
