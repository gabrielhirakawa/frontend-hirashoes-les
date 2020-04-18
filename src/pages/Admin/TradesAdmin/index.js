import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TiTick, TiTimes } from 'react-icons/ti'

import apiNode from '../../../services/api-node';
import { Container } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function TradesAdmin() {

  const [trocas, setTrocas] = useState([]);

  useEffect(() => {
    async function load() {
      const resp = await apiNode.get('/trocas').catch(e => toast.error('Erro ao carregar'));
      if (resp) {
        setTrocas(resp.data)
      }
    }

    load();
  }, []);

  async function aprovar(user_id, troca_id) {
    const resp = await apiNode.put(`${user_id}/trocas/${troca_id}`, { status: 'aprovada' }).catch(e => toast.error('Erro ao carregar'));
    if (resp) {
      toast.success('Aprovado com sucesso')
    }
  }

  async function recusar(user_id, troca_id) {
    const resp = await apiNode.put(`${user_id}/trocas/${troca_id}`, { status: 'recusada' }).catch(e => toast.error('Erro ao carregar'));
    if (resp) {
      toast.success('Rejeitado com sucesso')
    }
  }

  return (
    <>
      <MenuAdmin />
      <Container>
        <h1>Trocas/Devoluções pendentes</h1>
        <table border="1px">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Tipo</th>
              <th>Motivo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Produto</th>
              <th>Cliente id</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
              trocas.map(item => (
                <tr>
                  <td>{item.pedido.codigo}</td>
                  <td>{item.tipo}</td>
                  <td>{item.motivo}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
                  <td>{item.produto.nome}</td>
                  <td>{item.user_id}</td>
                  <td>
                    <TiTick color="green" size={26} onClick={() => aprovar(item.user_id, item.id)} />
                    <TiTimes color="red" size={26} onClick={() => recusar(item.user_id, item.id)} />
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </Container>
    </>
  );
}
