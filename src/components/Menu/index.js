import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'

import { Container } from './styles';
import logo from '../../assets/hirashoes.png'

export default function Menu() {
    return (
        <Container>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Produtos</Link></li>
                    <li><Link to="/register">Registrar</Link></li>
                    <li><Link to="/dashboard">Minha conta</Link></li>
                    <li><Link to="/cart"><FaShoppingCart size={20} /></Link></li>
                </ul>
            </nav>
        </Container>
    );
}
