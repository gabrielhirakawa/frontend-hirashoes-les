import React from 'react';

import { Container, Form } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Coupons() {
    return (
        <>
            <MenuAdmin/>
            <Container>
                <h1>Cadastrar novo Cupom</h1>
                <Form>
                    <input type="text" placeholder="Código do cupom" />
                    <input type="text" placeholder="Valor desconto %" />
                    <input type="number" placeholder="Quantidade" />
                    <label>Inicio</label>
                    <input type="date" />
                    <label>Valido até</label>
                    <input type="date" />
                    <button>Cadastrar</button>
                </Form>
            </Container>
        </>
    );
}
