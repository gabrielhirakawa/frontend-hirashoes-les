import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { isValid } from 'cpf';
import { FaSearch } from 'react-icons/fa';


import { Container, Content, FormCadastro, ButtonSalvar, DadosUsuario, DadosEndereco, Dados, Cep } from './styles';
import Menu from '../../components/Menu';

export default function Cadastro() {

  const [loading, setLoading] = useState(0);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');

  // useEffect(() => {
  //   async function loadCEP() {
  //     const resp = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
  //     const { data } = resp;
  //     setCidade(data.localidade);
  //     setEstado(data.uf);
  //     setRua(data.logradouro);
  //     setBairro(data.bairro);
  //     setPais('Brasil');
  //   }
  //   if (cep.length >= 8) {
  //     loadCEP();
  //   }
  // }, [cep]);

  async function loadCEP() {
    
    if (cep.length < 8) {
      toast.error("CEP inválido!")
    }
  
    const resp = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { data } = resp;
    setCidade(data.localidade);
    setEstado(data.uf);
    setRua(data.logradouro);
    setBairro(data.bairro);
    setPais('Brasil');
  }
 
  function phoneMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+$/, '$1');
  }

  function cpfMask(value) {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }



  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(1);
    const newCpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    if (password !== confirmPassword) {
      toast.warn("As senhas não coincidem!");
      setLoading(0);
      return;
    }

    if (password.length < 6) {
      toast.warn("A senha deve conter no mínimo 6 caracteres!");
      setLoading(0);
      return;
    }

    if (!isValid(cpf)) {
      toast.error('CPF inválido');
      setLoading(0);
      return;
    }


    try {
      const res = await api.post('http://localhost:8080/clientes', {
        nome,
        sobrenome,
        email,
        cpf: newCpf,
        status: 'ativo',
        password,
        telefones: [{
          numero: telefone,
        }],
        enderecos: [{
          cep,
          rua,
          numero,
          bairro,
          complemento,
          cidade,
          estado,
          pais
        }]
      });

      toast.success("cadastro realizado com sucesso!");
    }
    catch (e) {
      toast.error('erro ao cadastrar');
      setLoading(0);
    }
    setLoading(0);
  }

  return (


    <Container>
      <Menu />
      <Content>
        <h1>Realize seu <strong>Cadastro</strong>!</h1>
        <FormCadastro onSubmit={handleSubmit}>
          <Dados>
            <DadosUsuario>
              <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu primeiro nome *" />
              <input type="text" required value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Digite seu sobrenome *" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail *" />
              <input type="text" required value={phoneMask(telefone)} onChange={e => setTelefone(e.target.value)} placeholder="Digite seu telefone *" />
              <input type="text" required value={cpfMask(cpf)} onChange={e => setCpf(e.target.value)} placeholder="Digite seu CPF *" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha *" />
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha *" />
            </DadosUsuario>

            <DadosEndereco>
              <Cep>
                <input type="text" required maxLength="8" value={cep} onChange={e => setCep(e.target.value)} placeholder="Digite seu CEP *" />
                <button type="button" onClick={() => loadCEP()}><FaSearch size={16} color="#fff" /></button>
              </Cep>
              <input type="text" required value={rua} onChange={e => setRua(e.target.value)} placeholder="Rua *" />
              <div>
                <input type="text" required value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número *" />
                <input type="text" required value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro *" />
              </div>
              <input type="text" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Complemento" />
              <input type="text" required value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade *" />
              <input type="text" required value={estado} onChange={e => setEstado(e.target.value)} placeholder="Estado *" />
              <input type="text" required value={pais} onChange={e => setPais(e.target.value)} placeholder="País *" />

            </DadosEndereco>

          </Dados>
          <ButtonSalvar type="submit">
            {
              loading
                ? <Spinner animation="border" variant="light" size="sm" />
                : <span>FINALIZAR CADASTRO</span>
            }

          </ButtonSalvar>

        </FormCadastro>

        <Link to="/sessions">Já possui conta? Faça o login</Link>
      </Content>
    </Container>

  );
}
