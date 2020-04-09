import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Content, MyCart, Item, Total, ButtonFinalizar } from './styles';
import Menu from '../../components/Menu';


export default function Cart() {

    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);
    const [recalculate, setRecalculate] = useState(false);

    useEffect(() => {
        async function loadInfo() {
            const cartStorage = localStorage.getItem('carrinho');

            if (cartStorage) {
                const cart = JSON.parse(cartStorage);
                // cart.map((item) => {
                //     item.qtdeCarrinho = 1;
                // });
                
                setProdutos(cart);
            }


        }
        loadInfo();

    }, []);

    useEffect(() => {
        
        let valor = 0;
        produtos.map(item => {
            valor += item.preco * item.qtdeCarrinho;
        });
        setTotal(valor);

    }, [recalculate, produtos]);

    return (
        <Container>
            <Menu />
            <Content>
                <h1><FaShoppingCart /> Meu carrinho </h1>

                <MyCart>
                    {
                        produtos ?
                            (<Item>
                                {
                                    produtos.map((item, index) => (
                                        <li key={index}>
                                            <img src={item.url_img} alt="tenis" />
                                            <span>{item.nome}</span>
                                            <input placeholder="Qtd" type="number" defaultValue={1} onChange={e => {
                                                if (e.target.value >= 0) {
                                                    const array = produtos;
                                                    array[index].qtdeCarrinho = e.target.value;
                                                    setProdutos(array);
                                                    setRecalculate(!recalculate);
                                                    localStorage.setItem('carrinho', JSON.stringify(array));
                                                }
                                            }
                                            } />
                                            <button type="button" onClick={() => {
                                                const array = [];
                                                for (let i = 0; i < produtos.length; i++) {
                                                    if (i !== index) {
                                                        array.push(produtos[i]);
                                                    }
                                                }
                                                setProdutos(array);
                                                setRecalculate(!recalculate);
                                                localStorage.setItem('carrinho', JSON.stringify(array));
                                            }
                                            }>Remover item</button>
                                            <span>{item.preco}</span>
                                        </li>
                                    ))
                                }

                            </Item>)
                            :
                            (<></>)
                    }
                    <Total>
                        <span>Total:</span>
                        <span>{`R$ ${total},00`}</span>
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
