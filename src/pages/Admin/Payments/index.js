import React from 'react';

import { Container } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Payments() {
    return (
        <>
            <MenuAdmin />
            <Container>
                <h1>Histórico de vendas</h1>
                <input type="text" placeholder="Número do pedido" />
                <table border="1px">
                    <thead>
                        <tr>
                            <th>Número pedido</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Frete</th>
                            <th>Cupom</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>H1R5044P</td>
                            <td>24/02/2020</td>
                            <td>1049,80</td>
                            <td>0,00</td>
                            <td>Sim</td>
                            <td>Ver detalhes</td>
                        </tr>
                        <tr>
                            <td>H1R5044P</td>
                            <td>24/02/2020</td>
                            <td>1049,80</td>
                            <td>0,00</td>
                            <td>Sim</td>
                            <td>Ver detalhes</td>
                        </tr>
                        <tr>
                            <td>H1R5044P</td>
                            <td>24/02/2020</td>
                            <td>1049,80</td>
                            <td>0,00</td>
                            <td>Sim</td>
                            <td>Ver detalhes</td>
                        </tr>
                        <tr>
                            <td>H1R5044P</td>
                            <td>24/02/2020</td>
                            <td>1049,80</td>
                            <td>0,00</td>
                            <td>Sim</td>
                            <td>Ver detalhes</td>
                        </tr>
                        <tr>
                            <td>H1R5044P</td>
                            <td>24/02/2020</td>
                            <td>1049,80</td>
                            <td>0,00</td>
                            <td>Sim</td>
                            <td>Ver detalhes</td>
                        </tr>
                    </tbody>
                </table>
            </Container>
        </>
    );
}
