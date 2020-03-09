import React from 'react';
import { FaTshirt, FaChartLine, FaMoneyBillAlt, FaCommentDollar, FaExchangeAlt, FaUserFriends } from 'react-icons/fa'

import { Container, Item } from './styles';
import { Link } from 'react-router-dom';

export default function MenuAdmin() {
    return (
        <Container>
            <Link to="/admin/newproduct">
                <Item>
                    <FaTshirt size={38} />
                    <span>Produtos</span>
                </Item>
            </Link>
            <Link to="/admin/payments">
                <Item>
                    <FaMoneyBillAlt size={38} />
                    <span>Vendas</span>
                </Item>
            </Link>
            <Link to="/admin/analysis">
                <Item>
                    <FaChartLine size={38} />
                    <span>Análise</span>
                </Item>
            </Link>

            <Link to="/admin/coupons">
                <Item>
                    <FaCommentDollar size={38} />
                    <span>Cupons</span>
                </Item>
            </Link>

            <Link to="/admin/trades">
                <Item>
                    <FaExchangeAlt size={38} />
                    <span>Trocas</span>
                </Item>
            </Link>
            <Link to="/admin/customers">
                <Item>
                    <FaUserFriends size={38} />
                    <span>Clientes</span>
                </Item>
            </Link>
        </Container>
    );
}
