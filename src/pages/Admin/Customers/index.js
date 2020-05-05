import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from 'axios';
import { Table } from 'react-bootstrap';

import { Container, InputSearch } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function TradesAdmin() {

  const [customers, setCustomers] = useState([]);
  const [idUser, setIdUser] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get(`http://localhost:8080/clientes`);
        const { data } = res;
        const { entidades } = data;

        if (!entidades[0].id) {
          toast.error('Dados não encontrados');
          return;
        }
        setCustomers(entidades);
      }
      catch (e) {
        toast.error('Erro ao carregar usuários');
      }
    }
    loadData();

  }, []);

  async function loadCustomer(event) {
    event.preventDefault();

    if (!idUser) {
      try {
        const res = await api.get(`http://localhost:8080/clientes`);
        const { data } = res;
        const { entidades } = data;

        if (!entidades[0].id) {
          toast.error('Dados não encontrados');
          return;
        }
        setCustomers(entidades);
      }
      catch (e) {
        toast.error('Erro ao carregar usuários');
      }
      return;
    }

    try {
      const res = await api.get(`http://localhost:8080/clientes/${idUser}`);

      const { data } = res;
      const { entidades } = data;
      if (!entidades[0].id) {
        toast.error('Usuário não encontrado');
        return;
      }

      setCustomers([]);
      const customer = {
        id: entidades[0].id,
        nome: entidades[0].nome,
        sobrenome: entidades[0].sobrenome,
        email: entidades[0].email,
        cpf: entidades[0].cpf,
        status: entidades[0].status,
      }
      const newCustomers = [customer]
      setCustomers(newCustomers);


    } catch (e) {
      toast.error('erro ao carregar dados da conta');
      return;
    }
  }
  return (
    <>
      <MenuAdmin />
      <Container>
        <h1>Todos os clientes</h1>
        <form onSubmit={loadCustomer}>
          <InputSearch value={idUser} onChange={e => setIdUser(e.target.value)} type="text" placeholder="Código do cliente" />
          <button type="submit">
            <FaSearch size={34} color="#fff" />
          </button>
        </form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Status</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>

            {
              customers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.sobrenome}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>
                  <td>{user.status}</td>
                  <td>ver detalhes</td>
                </tr>
              ))
            }

          </tbody>
        </Table>
      </Container>
    </>
  );
}
