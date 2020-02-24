import React from 'react';

import { Container, Content, Form, ButtonUpdate } from './styles';
import Menu from '../../components/Menu';

export default function Account() {
  return (
    <Container>
        <Menu />
        <Content>
            <h1>Meus dados</h1>
        <Form>
            <input type="text" placeholder="Nome completo" />
            <input type="text" placeholder="Telefone" />
            <input type="text" placeholder="e-mail" />
            <input type="text" placeholder="CPF" />
            <ButtonUpdate>ATUALIZAR</ButtonUpdate>
        </Form>
        </Content>
    </Container>
  );
}
