import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, Content, Table, DetailItem } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';

export default function TrocasUser() {

  const [detailVisible, setDetailVisible] = useState(false);
  const [trocas, setTrocas] = useState([]);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      const resp = await apiNode.get(`/${user_id}/trocas`).catch(e => toast.error('Erro ao buscar dados'));

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
        <Table border>
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
       
        
      </Content>
    </Container>
  );
}
