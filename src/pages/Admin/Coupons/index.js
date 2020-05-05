import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import { Container, Form } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';
import apiNode from '../../../services/api-node';

export default function Coupons() {


    const [codigo, setCodigo] = useState('');
    const [userId, setUserId] = useState('');
    const [valor, setValor] = useState('');
    const [percentual, setPercentual] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipo, setTipo] = useState('promocional');

    const [cuponsTroca, setCuponsTroca] = useState([]);
    const [cupons, setCupons] = useState([]);


    async function loadData() {
        const resp = await apiNode.get('/cupons').catch(e => toast.error('Erro ao consultar cupons'));
        if (resp.data) {
            setCupons(resp.data.cupons);
            setCuponsTroca(resp.data.cuponsTroca);
        }
    }

    useEffect(() => {
        loadData();
    }, [])


    async function criar(e) {
        e.preventDefault();

        var resp = null;

        if (tipo === 'promocional') {
            resp = await apiNode.post('/cupons', {
                codigo,
                tipo,
                percentual_desconto: percentual,
                quantidade,
            }).catch(e => toast.error('Erro ao criar cupom'));
        }

        else {

            const userExists = await apiNode.get(`/users/${userId}`).catch(e => {
                toast.error('ID de cliente não encontrado');
            });

            console.log(userExists)

            if (!userExists) {
                return;
            }

            resp = await apiNode.post('/cupons', {
                codigo,
                tipo,
                valor,
                user_id: userId,
            }).catch(e => toast.error('Erro ao criar cupom'));


        }

        if (resp.data) {
            toast.success('cupom cadastrado com sucesso!');
            loadData();
        }
    }

    return (
        <>
            <MenuAdmin />
            <Container>
                <h2>Cupons Promocionais</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>% desconto</th>
                            <th>quantidade</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cupons.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.codigo}</td>
                                    <td>{item.percentual_desconto}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <h2>Cupons de Troca</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>ID Cliente</th>
                            <th>valor</th>
                            <th>utilizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cuponsTroca.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.codigo}</td>
                                    <td>{item.user_id}</td>
                                    <td>{item.valor.toFixed(2)}</td>
                                    <td>{item.utilizado === false ? 'não' : 'sim'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <h2>Cadastrar novo Cupom</h2>
                <Form onSubmit={criar}>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} type="text" placeholder="Código do cupom" />
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option>promocional</option>
                        <option>troca</option>
                    </select>
                    {
                        tipo === 'promocional' ?
                            (
                                <>
                                    <input value={percentual} onChange={e => setPercentual(e.target.value)} type="text" placeholder="Percentual desconto %" />
                                    <input value={quantidade} onChange={e => setQuantidade(e.target.value)} type="text" placeholder="Quantidade" />
                                </>)
                            :
                            (
                                <>
                                    <input value={valor} onChange={e => setValor(e.target.value)} type="text" placeholder="Valor R$" />
                                    <input value={userId} onChange={e => setUserId(e.target.value)} type="text" placeholder="ID Cliente" />
                                </>
                            )
                    }


                    <button type="submit" >Salvar</button>

                </Form>
            </Container>
        </>
    );
}
