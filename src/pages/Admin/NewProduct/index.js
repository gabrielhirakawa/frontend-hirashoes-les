import React from 'react';

import { Container, Form } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function NewProduct() {
  return (
    <>
    <MenuAdmin />
    <Container>  
        <h1>Cadastrar novo produto</h1>
        <Form>
            <input type="text" placeholder="Nome do produto" />
            <input type="text" placeholder="Preço do produto" />
            <select>
              <option>Calçados</option>
              <option>Roupas</option>
              <option>Acessórios</option>
            </select>
            <input type="number" placeholder="Quantidade em estoque" />
            <textarea placeholder="Descrição" />
            <input type="file" />
            <button>Cadastrar</button>
        </Form>
    </Container>
    </>
  );
}
