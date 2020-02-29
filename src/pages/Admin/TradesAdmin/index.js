import React from 'react';
import { TiTick, TiTimes } from 'react-icons/ti'

import { Container } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function TradesAdmin() {
  return (
    <>
      <MenuAdmin />
      <Container>
        <h1>Trocas/Devoluções pendentes</h1>
        <table border="1px">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Data</th>
              <th>Nome Cliente</th>
              <th>Tipo</th>
              <th>Motivo</th>
              <th>Descrição do cliente</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>29109201</td>
              <td>02/02/2020</td>
              <td>Gabriel Hirakawa</td>
              <td>Troca</td>
              <td>Insatisfação</td>
              <td>Produto diferente da foto</td>
              <td><TiTick color="green" size={26} /><TiTimes color="red" size={26} /></td>
            </tr>
            <tr>
              <td>82912891</td>
              <td>01/02/2020</td>
              <td>Maria Flores</td>
              <td>Devolução</td>
              <td>Tamanho errado</td>
              <td>Ficou muito grande</td>
              <td><TiTick color="green" size={26} /><TiTimes color="red" size={26} /></td>
            </tr>
            <tr>
              <td>72413290</td>
              <td>28/01/2020</td>
              <td>João Pedro</td>
              <td>Devolução</td>
              <td>Defeito de fabricação</td>
              <td>Produto veio com defeito</td>
              <td><TiTick color="green" size={26} /><TiTimes color="red" size={26} /></td>
            </tr>
            <tr>
              <td>32416280</td>
              <td>10/01/2020</td>
              <td>Gabriel Hirakawa</td>
              <td>Troca</td>
              <td>Tamanho errado</td>
              <td>Tênis ficou pequeno</td>
              <td><TiTick color="green" size={26} /><TiTimes color="red" size={26} /></td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
