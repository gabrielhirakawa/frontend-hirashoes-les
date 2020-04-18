import React, { useState} from 'react';
import { toast } from 'react-toastify';

import { Container, Form } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';
import apiNode from '../../../services/api-node';

export default function Coupons() {

    const [codigo, setCodigo] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('promocional');


    async function criar(){
        const resp = await apiNode.post('/cupons', {
            codigo,
            valor,
            tipo,
        }).catch(e => toast.error('Erro ao criar'));

        if(resp.data){
            toast.success('cupom cadastrado com sucesso!')
        }
    }

    return (
        <>
            <MenuAdmin/>
            <Container>
                <h1>Cadastrar novo Cupom</h1>
                <Form>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} type="text" placeholder="Código do cupom" />
                    <input value={valor} onChange={e => setValor(e.target.value)} type="text" placeholder="Valor desconto" />
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option>promocional</option>
                        <option>troca</option>
                        <option>devolução</option>
                    </select>
                    <button type="button" onClick={() => criar()}>Salvar</button>
                    
                </Form>
            </Container>
        </>
    );
}
