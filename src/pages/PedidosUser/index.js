import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Table, DetailItem } from './styles';
import Menu from '../../components/Menu';
export default function PedidosUser() {

  const [detailVisible, setDetailVisible] = useState(false);

  function renderDetails() {
    return (
      <DetailItem>
        <h2>PEDIDO Nº H1R5044P</h2>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tênis Air Force 1</td>
              <td>249,90</td>
              <td><Link to="/trade">Solicitar troca/devolução</Link></td>
            </tr>
            <tr>
              <td>Tênis Air Jordan 4</td>
              <td>799,90</td>
              <td><Link to="/trade">Solicitar troca/devolução</Link></td>
            </tr>
          </tbody>
        </table>
        <div>
          <span><strong>Total:</strong> </span>
          <span>R$ 1049,80</span>
        </div>
      </DetailItem>
    )
  }

  return (
    <Container>
      <Menu />
      <Content>
        <h1>
          Meus Pedidos
        </h1>
        <Table border>
          <thead>
            <tr>
              <th>Código pedido</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Frete</th>
              <th>Pagamento</th>
              <th>#</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>H1R5044P</td>
              <td>24/02/2020</td>
              <td>1049.80</td>
              <td>0,00</td>
              <td>VISA</td>
              <td><button onClick={() => {
                renderDetails();
                setDetailVisible(1);
              }}>Ver detalhes</button></td>
            </tr>
            <tr>
              <td>H1R9045A</td>
              <td>24/02/2020</td>
              <td>249,90</td>
              <td>19,90</td>
              <td>Boleto</td>
              <td>Ver detalhes</td>
            </tr>
            <tr>
              <td>H1R9049B</td>
              <td>24/02/2020</td>
              <td>89,90</td>
              <td>19,90</td>
              <td>VISA</td>
              <td>Ver detalhes</td>
            </tr>
          </tbody>
        </Table>

        {
          detailVisible ?
            renderDetails()
            :
            (<></>)
        }

      </Content>
    </Container>
  );
}
