import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

import apiNode from '../../../services/api-node';
import { Container, Cards } from './styles';
import MenuAdmin from '../../../components/MenuAdmin';

export default function Payments() {

    const [pedidos, setPedidos] = useState([]);
    const [detailsCard, setDetailsCard] = useState([]);
    const [detailsAtive, setDetailsAtive] = useState(false);

    useEffect(() => {
        async function load() {
            const resp = await apiNode.get('/pedidos').catch(e => toast.error('Não foi possivel carregar'));
            setPedidos(resp.data);
        }
        load();
    }, [])

    async function details(id) {
        const resp = await apiNode.get(`/pedidos/${id}`).catch(e => toast.error('Não foi possivel carregar'));
        setDetailsCard(resp.data.cartoes);
        console.log(resp.data.cartoes)
    }

    return (
        <>
            <MenuAdmin />
            <Container>
                <h1>Histórico de vendas</h1>
                <div>
                    <input type="text" placeholder="Número do pedido" />
                    <FaSearch size={34} />
                </div>
                <table border="1px">
                    <thead>
                        <tr>
                            <th>Número pedido</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Desconto</th>
                            <th>Frete</th>
                            <th>Total com desconto</th>
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
                                    <td>{item.total}</td>
                                    <td>{item.desconto}</td>
                                    <td>{item.frete}</td>
                                    <td>{item.total_com_desconto}</td>
                                    <td>{item.user_id}</td>
                                    <td><button onClick={() => {
                                        details(item.id);
                                        setDetailsAtive(true);
                                    }} type="button">Ver detalhes</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                
                {
                    detailsAtive ?
                        (<><h3>Detalhes do pagamento</h3><Cards>

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
                        </Cards></>)
                        :
                        (<></>)

                }
            </Container>
        </>
    );
}
