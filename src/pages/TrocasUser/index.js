import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import { Container, Content, DetailItem } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';

export default function TrocasUser() {


  const [trocas, setTrocas] = useState([]);
  const [cupons, setCupons] = useState([]);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      const resp = await apiNode.get(`/${user_id}/trocas`).catch(e => toast.error('Erro ao buscar dados'));

      const user = await apiNode.get(`/users/${user_id}`).catch(e => toast.error('Erro ao buscar dados'));

      setCupons(user.data.cupons);
      setTrocas(resp.data);
    }
    loadData();
  }, []);


  return (
    <Container>
      <Menu />
      <Content>
        <h1>
          Minhas Solicitações
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Tipo</th>
              <th>Motivo</th>
              <th>Produto</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>#</th>

            </tr>
          </thead>
          <tbody>
            {
              trocas.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.pedido.codigo}</td>
                  <td>{item.tipo}</td>
                  <td>{item.motivo}</td>
                  <td>{item.produto.nome}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
                  <td></td>
                </tr>
              ))
            }

          </tbody>
        </Table>

        <h2>Cupons de Troca</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Cupom</th>
              <th>Código</th>
              <th>valor</th>
              <th>utilizado</th>
            </tr>
          </thead>
          <tbody>
            {
              cupons.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.codigo}</td>
                  <td>{item.valor.toFixed(2)}</td>
                  <td>{item.utilizado  === false ? 'não' : 'sim'}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>


      </Content>
    </Container>
  );
}
