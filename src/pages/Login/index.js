import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, FormLogin, ButtonLogin } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';
import logo from '../../assets/hirashoes-white.png';
import { toast } from 'react-toastify';

export default function Login({ history }) {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState(''); 

  async function handleSubmit(e){
    e.preventDefault();
    const resp = await apiNode.post('/sessions', {
      email: user,
      password
    }).catch(e => toast.error('Houve algum erro ao tentar fazer o login'));

    if(resp.data){
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user_id', resp.data.user.id);
      history.push('/dashboard');
    }
  }

  return (
    <Container>
      <Menu />
      <Content>
        <img src={logo} alt="hirashoes" />
        <FormLogin onSubmit={handleSubmit}>
          <input id="input-login" value={user} onChange={e => setUser(e.target.value)} type="email" placeholder="Digite seu e-mail" />
          <input id="input-senha" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
          <ButtonLogin type="submit">ENTRAR</ButtonLogin>
        </FormLogin>
        <Link to="/register">Criar minha conta</Link>
      </Content>
    </Container>

  );
}
