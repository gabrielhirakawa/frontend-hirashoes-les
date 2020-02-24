import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, FormCadastro, ButtonSalvar } from './styles';
import Menu from '../../components/Menu';

export default function Cadastro() {
  return (


    <Container>
      <Menu />
      <Content>
        <h1>Realize seu <strong>Cadastro</strong>!</h1>
        <FormCadastro onSubmit="" >
          <input type="text" placeholder="Digite seu nome completo" />
          <input type="email" placeholder="Digite seu e-mail" />
          <input type="text" placeholder="Digite seu telefone" />
          <input type="text" placeholder="Digite seu CPF" />
          <input type="password" placeholder="Escolha uma senha" />
          <input type="password" placeholder="Confirme sua senha" />
          <ButtonSalvar type="submit">CADASTRAR!</ButtonSalvar>
          <Link to="/sessions">Já possui conta? Faça o login</Link>
        </FormCadastro>
      </Content>
    </Container>

  );
}
