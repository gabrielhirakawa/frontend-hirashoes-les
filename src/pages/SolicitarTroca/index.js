import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, Content, FormTrade } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';

export default function Trade(props) {
    const { produto, pedido } = props.match.params;
    const user_id = localStorage.getItem('user_id');
    const [tipo, setTipo] = useState('Troca');
    const [motivo, setMotivo] = useState('Defeito de fabricação');
    const [descricao, setDescricao] = useState('');
    

    async function solicitarTroca(){

        const payload = {
            produto_id: produto,
            pedido_id: pedido,
            tipo,
            motivo,
            descricao
        }
        const resp = await apiNode.post(`${user_id}/trocas`, payload).catch(e => toast.error('Não foi possível solicitar a troca'));
        if(resp.data){
            toast.success('Troca solicitada com sucesso!')
        }
    }

    return (
        <Container>
            <Menu />
            <Content>
                <h1>Solicitar Troca/Devolução</h1>
                <FormTrade>
                    <select value={tipo} onChange={e => setTipo(e.target.value)} >
                        <option>Troca</option>
                        <option>Devolução</option>
                    </select>
                    <select value={motivo} onChange={e => setMotivo(e.target.value)}>
                        <option>Defeito de fabricação</option>
                        <option>Tamanho errado</option>
                        <option>Insatisfação</option>
                        <option>Outro</option>
                    </select>
                    <textarea value={descricao} onChange={e => setDescricao(e.target.value)}  placeholder="Descreva o motivo da troca"  rows="6"></textarea>
                    <button type="button" onClick={()=> solicitarTroca()}>Solicitar</button>
                </FormTrade>
            </Content>
        </Container>
    );
}
