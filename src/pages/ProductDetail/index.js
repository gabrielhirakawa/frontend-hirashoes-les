import React from 'react';

import { Container, Content, Product, ProductOptions, Tamanho } from './styles';
import Menu from '../../components/Menu';
import tenis from '../../assets/airforce.jpg'

export default function ProductDetail() {
    return (
        <Container>
            <Menu />
            <Content>
                <Product>
                    <img src={tenis} alt="tenis" />
                    <ProductOptions>
                        <h2>Tênis Air Force 1</h2>
                        <Tamanho>
                            <label>
                                36
                            </label>
                            <label>
                                37
                            </label>
                            <label>
                                38
                            </label>
                            <label>
                                39
                            </label>
                            <label>
                                40
                            </label>
                            <label>
                                41
                            </label>
                            <label>
                                42
                            </label>
                            <label>
                                43
                            </label>

                        </Tamanho>
                        <span>R$ 249,90</span>
                        <button>Adicionar ao Carrinho</button>
                    </ProductOptions>
                </Product>
            </Content>
        </Container>
    );
}
