import React from 'react';
import { FaUser, FaTruck, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Content, Cards, CardItem, ButtonLoggout } from './styles';
import Menu from '../../components/Menu';

export default function Dashboard({ history }) {
    return (
        <Container>
            <Menu />
            <Content>
                <h1>MINHA CONTA</h1>
                <Cards>
                    <Link to="/account">
                        <CardItem>
                            <FaUser size={56} />
                            <span>Meus Dados</span>
                        </CardItem>
                    </Link>
                    <Link to="/mycards">
                        <CardItem>
                            <FaCreditCard size={56} />
                            <span>Meus Cartões</span>
                        </CardItem>
                    </Link>
                    <Link to="/myorders">
                        <CardItem>
                            <FaTruck size={56} />
                            <span>Meus Pedidos</span>
                        </CardItem>
                    </Link>
                    <Link to="/mytrades">
                        <CardItem>
                            <FaExchangeAlt size={56} />
                            <span>Trocas/Devoluções</span>
                        </CardItem>
                    </Link>
                </Cards>
                <ButtonLoggout onClick={() => { 
                    localStorage.removeItem('token');
                    history.push('/sessions');
                    }}><span>Sair</span></ButtonLoggout>
            </Content>
        </Container>
    );
}
