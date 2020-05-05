import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import apiNode from '../../../services/api-node';
import { Container, Cards, Test, Modal, StatusEntrega, StatusStep } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Payments() {

    const [pedidos, setPedidos] = useState([]);
    const [detailsCard, setDetailsCard] = useState([]);
    const [detailsItens, setDetailsItens] = useState([]);
    const [detailsAtive, setDetailsAtive] = useState(false);
    const [statusEntrega, setStatusEntrega] = useState('pendente');
    const [idPedidoAtivo, setIdPedidoAtivo] = useState(0);

    useEffect(() => {
        async function load() {
            const resp = await apiNode.get('/pedidos').catch(e => toast.error('Não foi possivel carregar'));
            setPedidos(resp.data);
        }
        load();
    }, []);

    async function atualizarPedido(){
        const resp = await apiNode.put(`/pedidos/${idPedidoAtivo}`, { status_entrega: statusEntrega }).catch(e => toast.error('Não foi possivel atualizar pedido'));
        if(resp.data){
            toast.success('Pedido Atualizado com sucesso!');
        }

    }

    async function details(id) {
        const resp = await apiNode.get(`/pedidos/${id}`).catch(e => toast.error('Não foi possivel carregar'));
        setDetailsCard(resp.data.pedido.cartoes);
        setDetailsItens(resp.data.pedido.itens);
        
    }

    return (
        <>
            {
                detailsAtive ?
                    (
                        <Test>
                            <Modal>
                                <h3>Detalhes do pagamento</h3>
                                <Cards>

                                    {
                                        detailsCard.map((item, index) => (
                                            <div key={item.id}>
                                                <h4>Cartão {index + 1}</h4>
                                                <span>Número Cartão: {item.numero}</span>
                                                <span>Titular: {item.nome_impresso}</span>
                                                <span>Data Expiração: {item.data_expiracao}</span>
                                                <span>Bandeira: {item.bandeira}</span>
                                            </div>
                                        ))
                                    }
                                    {

                                    }

                                </Cards>
                                <StatusEntrega>
                                    <label>Atualizar status: </label>
                                    <StatusStep defaultValue={statusEntrega} onChange={e => setStatusEntrega(e.target.value)}>
                                        <option value='pendente'>PENDENTE</option>
                                        <option value='em separacao'>EM SEPARAÇÃO</option>
                                        <option value='em transporte'>EM TRANSPORTE</option>
                                        <option value='entregue'>ENTREGUE</option>
                                    </StatusStep>
                                    <button type="button" onClick={() => atualizarPedido()}>Atualizar</button>
                                </StatusEntrega>


                                <button type="button" onClick={() => setDetailsAtive(false)}>Fechar</button>
                            </Modal>

                        </Test>)

                    :
                    (<></>)

            }

            <MenuAdmin />
            <Container>
                <h1>Histórico de vendas</h1>
                <div>
                    <input type="text" placeholder="Número do pedido" />
                    <FaSearch size={34} />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Número pedido</th>
                            <th>Tipo</th>
                            <th>Pagamento</th>
                            <th>Total</th>
                            <th>Desconto</th>
                            <th>Frete</th>
                            <th>Total com desconto</th>
                            <th>Status</th>
                            <th>Cod Cliente</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.map(item => (
                                <tr key={item.id}>
                                    <td>{item.codigo}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.status}</td>
                                    <td>{item.total.toFixed(2)}</td>
                                    <td>{item.desconto.toFixed(2)}</td>
                                    <td>{item.frete.toFixed(2)}</td>
                                    <td>{item.total_com_desconto.toFixed(2)}</td>
                                    <td>{item.status_entrega}</td>
                                    <td>{item.user_id}</td>
                                    <td><button onClick={() => {
                                        setIdPedidoAtivo(item.id);
                                        details(item.id);
                                        setDetailsAtive(true);
                                    }} type="button">Ver detalhes</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>

            </Container>
        </>
    );
}
