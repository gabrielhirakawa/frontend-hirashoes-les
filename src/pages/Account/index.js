import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { isValid } from 'cpf';
import { FaSearch } from 'react-icons/fa';
import apiCorreios from 'axios';

import apiNode from '../../services/api-node';


import { Container, Content, FormCadastro, DadosUsuario, DadosEndereco, Dados, Cep, ButtonSalvar, IdUser, ButtonRemover } from './styles';
import Menu from '../../components/Menu';

export default function Account() {

  
  const idUser = localStorage.getItem('user_id');
  const [loading, setLoading] = useState(0);
  const [loadingRemover, setLoadingRemover] = useState(0);

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


  async function loadData() {
    try {
      const res = await apiNode.get(`users/${idUser}`);

      const { data } = res;
      const { id } = data;
      if (!id) {
        toast.error('Usuário não encontrado');
        return;
      }
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setEmail(data.email);
      setCpf(data.cpf);
      setTelefone(data.telefones[0].numero);
      setCep(data.enderecos[0].cep);
      setRua(data.enderecos[0].rua);
      setNumero(data.enderecos[0].numero);
      setBairro(data.enderecos[0].bairro);
      setComplemento(data.enderecos[0].complemento);
      setCidade(data.enderecos[0].cidade);
      setEstado(data.enderecos[0].estado);
      setPais(data.enderecos[0].pais);

    }
    catch (e) {
      toast.error('erro ao carregar dados da conta');
      setLoading(0);
      return;
    }
    setLoading(0);
  }

  useEffect(()=> {
    loadData();
  }, [])


  async function loadCEP() {

    if (cep.length < 8) {
      toast.error("CEP inválido!")
    }

    const resp = await apiCorreios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { data } = resp;
    setCidade(data.localidade);
    setEstado(data.uf);
    setRua(data.logradouro);
    setBairro(data.bairro);
    setPais('Brasil');
  }

  function phoneMask(value) {
    if (value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+$/, '$1');
    }
  }

  function cpfMask(value) {
    if (value) {
      return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
  }

  async function excluirConta() {
    try {
      const res = await apiNode.delete(`http://localhost:8080/clientes/${idUser}`);

      toast.success("Sua conta foi excluída com sucesso!");
    }
    catch (e) {
      toast.error('erro ao excluir conta');
      setLoading(0);
    }
    setLoading(0);
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
      const res = await apiNode.put(`http://localhost:8080/clientes/${idUser}`, {
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

      toast.success("Perfil atualizado com sucesso!");
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
        <h1>Meus dados</h1>

        <FormCadastro onSubmit={handleSubmit}>
         

          <Dados>
            <DadosUsuario>
              <input type="text" id="input-name" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu primeiro nome *" />
              <input type="text" id="input-lastname" required value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Digite seu sobrenome *" />
              <input type="email" id="input-email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail *" />
              <input type="text" required value={phoneMask(telefone)} onChange={e => setTelefone(e.target.value)} placeholder="Digite seu telefone *" />
              <input type="text" required value={cpfMask(cpf)} onChange={e => setCpf(e.target.value)} placeholder="Digite seu CPF *" />
              <input type="password" id="input-pass" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha *" />
              <input type="password" id="input-pass2" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha *" />
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
                : <span>ATUALIZAR PERFIL</span>
            }

          </ButtonSalvar>
          <ButtonRemover type="button" onClick={() => excluirConta()}>
            {
              loadingRemover
                ? <Spinner animation="border" variant="light" size="sm" />
                : <span>EXCLUIR CONTA</span>
            }
          </ButtonRemover>
        </FormCadastro>
      </Content>
    </Container>
  );
}
