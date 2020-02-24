import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, FormLogin, ButtonLogin } from './styles';
import Menu from '../../components/Menu';
import logo from '../../assets/hirashoes-white.png';

export default function Login() {
  return (
    <Container>
      <Menu />
      <Content>
        <img src={logo} alt="hirashoes" />
        <FormLogin>
          <input type="email" placeholder="Digite seu e-mail" />
          <input type="password" placeholder="Digite sua senha" />
          <ButtonLogin type="button">ENTRAR</ButtonLogin>
        </FormLogin>
        <Link to="/register">Criar minha conta</Link>
      </Content>
    </Container>

  );
}
