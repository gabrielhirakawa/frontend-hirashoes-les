import React from 'react';

import { Container, Content, FormTrade } from './styles';
import Menu from '../../components/Menu';

export default function Trade() {
    return (
        <Container>
            <Menu />
            <Content>
                <h1>Solicitar Troca/Devolução</h1>
                <FormTrade>
                    <select>
                        <option>Troca</option>
                        <option>Devolução</option>
                    </select>
                    <select>
                        <option>Defeito de fabricação</option>
                        <option>Tamanho errado</option>
                        <option>Insatisfação</option>
                        <option>Outro</option>
                    </select>
                    <textarea  placeholder="Digite o motivo da troca"  rows="6"></textarea>
                    <button>Solicitar</button>
                </FormTrade>
            </Content>
        </Container>
    );
}
