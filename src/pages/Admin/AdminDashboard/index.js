import React from 'react';
import { Link } from 'react-router-dom';
import { FaTshirt, FaChartLine, FaMoneyBillAlt, FaCommentDollar, FaExchangeAlt } from 'react-icons/fa'


import { Container, Item } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function AdminDashboard() {
  return (
    <>
      <Container>
            <Link to="/admin/newproduct">
                <Item>
                    <FaTshirt size={80} />
                    <span>Produtos</span>
                </Item>
            </Link>
            <Link to="/admin/payments">
                <Item>
                    <FaMoneyBillAlt size={80} />
                    <span>Vendas</span>
                </Item>
            </Link>
            <Link to="/admin/analysis">
                <Item>
                    <FaChartLine size={80} />
                    <span>Análise</span>
                </Item>
            </Link>

            <Link to="/admin/coupons">
                <Item>
                    <FaCommentDollar size={80} />
                    <span>Cupons</span>
                </Item>
            </Link>

            <Link to="/admin/trades">
                <Item>
                    <FaExchangeAlt size={80} />
                    <span>Trocas</span>
                </Item>
            </Link>
        </Container>
    </>
  );
}
