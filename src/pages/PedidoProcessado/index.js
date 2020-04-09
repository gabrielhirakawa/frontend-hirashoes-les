import React from 'react';
import { FaUser, FaTruck, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';
import Menu from '../../components/Menu';

import img from '../../assets/payment-img.svg';

export default function Dashboard(props) {
    const { codigo } = props.match.params;
    return (
        <Container>
            <Menu />
            <Content>
                <h1>Pedido aprovado com sucesso!</h1>
                <h3>Nº {`${codigo}`}</h3>
                <img src={img} alt="confirmado" />
                <h4>Em breve enviaremos informações de rastreio...</h4>
                <Link to="/">Voltar a home</Link>
            </Content>
        </Container>
    );
}
