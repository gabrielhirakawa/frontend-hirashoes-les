import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import { Container, Content, DetailItem, Steps, CircleStep } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';

export default function PedidosUser() {

  const [detailVisible, setDetailVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState('');
  const [arraySteps, setArraysSteps] = useState([true, false, false, false]);
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código pedido</th>
              <th>Pagamento</th>
              <th>Total</th>
              <th>Frete</th>
              <th>Pagamento</th>
              <th>Status Entrega</th>
              <th>#</th>

            </tr>
          </thead>
          <tbody>
            {
              pedidos.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.codigo}</td>
                  <td>{item.tipo}</td>
                  <td>{`${item.total_com_desconto.toFixed(2)}`}</td>
                  <td>{item.frete}</td>
                  <td>{item.status}</td>
                  <td>{item.status_entrega}</td>
                  <td><button type="button" onClick={() => {
                    setDetailVisible(true);
                    setPedidoSelecionado(index);
                    let array = []
                    switch (item.status_entrega) {
                      case 'pendente':
                        array = [true, false, false, false];
                        setArraysSteps(array);
                        break;
                      case 'em separacao':
                        array = [true, true, false, false];
                        setArraysSteps(array);
                        break;
                      case 'em transporte':
                        array = [true, true, true, false];
                        setArraysSteps(array);
                        break;
                      case 'entregue':
                        array = [true, true, true, true];
                        setArraysSteps(array);
                        break;
                    }
                  }}>Ver detalhes</button></td>
                </tr>
              ))
            }

          </tbody>
        </Table>

        {
          detailVisible ?
            (<DetailItem>
              <Steps>
                <div>
                  <CircleStep ative={arraySteps[0]}>1</CircleStep>
                  <label>Pendente</label>
                </div>
                <div>
                  <CircleStep ative={arraySteps[1]}>2</CircleStep>
                  <label>Em Separação</label>
                </div>
                <div>
                  <CircleStep ative={arraySteps[2]}>3</CircleStep>
                  <label>Em transporte</label>
                </div>
                <div>
                  <CircleStep ative={arraySteps[3]}>4</CircleStep>
                  <label>Entregue</label>
                </div>
              </Steps>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pedidos[pedidoSelecionado].produtos.map(item => (
                      <tr key={item.id}>
                        <td><img src={item.url_img} /></td>
                        <td>{item.nome}</td>
                        <td>{`${item.preco.toFixed(2)}`}</td>
                        <td>{item.itens_pedidos.quantidade}</td>
                        <td><Link to={`/trade/${pedidos[pedidoSelecionado].id}/${item.id}/${item.itens_pedidos.quantidade}`}>Solicitar troca/devolução</Link></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div>
                <span><strong>Total carrinho:</strong> </span>
                <span>{`R$ ${(pedidos[pedidoSelecionado].total - pedidos[pedidoSelecionado].frete).toFixed(2)}`}</span>
              </div>
              <div>
                <span><strong>- Desconto:</strong> </span>
                <span>{`R$ ${pedidos[pedidoSelecionado].desconto.toFixed(2)}`}</span>
              </div>
              <div>
                <span><strong> + Frete:</strong> </span>
                <span>{`R$ ${pedidos[pedidoSelecionado].frete.toFixed(2)}`}</span>
              </div>

              <div>
                <span><strong>Total:</strong> </span>
                <span>{`R$ ${pedidos[pedidoSelecionado].total_com_desconto.toFixed(2)}`}</span>
              </div>
            </DetailItem>)
            :
            (<></>)
        }

      </Content>
    </Container>
  );
}
