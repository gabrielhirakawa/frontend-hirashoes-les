import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, Content, Table, DetailItem } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';

export default function PedidosUser() {

  const [detailVisible, setDetailVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState('');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      const resp = await apiNode.get(`/users/${user_id}`).catch(e => toast.error('Erro ao buscar dados'));

      setPedidos(resp.data.pedidos);
    }
    loadData();
  }, []);


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
              <th>Pagamento</th>
              <th>Total</th>
              <th>Frete</th>
              <th>Status</th>
              <th>#</th>

            </tr>
          </thead>
          <tbody>
            {
              pedidos.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.codigo}</td>
                  <td>{item.tipo}</td>
                  <td>{`${item.total_com_desconto},00`}</td>
                  <td>{item.frete}</td>
                  <td>{item.status}</td>
                  <td><button onClick={() => {
                    setDetailVisible(!detailVisible);
                    setPedidoSelecionado(index);
                  }}>Ver detalhes</button></td>
                </tr>
              ))
            }

          </tbody>
        </Table>

        {
          detailVisible ?
            (<DetailItem>
              <h4>Código: {`${pedidos[pedidoSelecionado].codigo}`}</h4>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pedidos[pedidoSelecionado].itens.map(item => (
                      <tr key={item.id}>
                        <td><img src={item.url_img} /></td>
                        <td>{item.nome}</td>
                        <td>{`${item.preco},00`}</td>
                        <td><Link to={`/trade/${pedidos[pedidoSelecionado].id}/${item.id}`}>Solicitar troca/devolução</Link></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div>
                <span><strong>Desconto:</strong> </span>
                <span>{`R$ ${pedidos[pedidoSelecionado].desconto},00`}</span>
              </div>
              <div>
                <span><strong>Total:</strong> </span>
                <span>{`R$ ${pedidos[pedidoSelecionado].total_com_desconto},00`}</span>
              </div>
            </DetailItem>)
            :
            (<></>)
        }

      </Content>
    </Container>
  );
}
