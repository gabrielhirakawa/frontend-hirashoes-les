import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, ProductList } from './styles';
import Menu from '../../components/Menu';
import apiNode from '../../services/api-node';



export default function Home() {

   const [produtos, setProdutos] = useState([]);
   const [carrinho, setCarrinho] = useState([]);
   const [carrinhoAction, setCarrinhoAction] = useState(false);

   useEffect(() => {
      async function loadInfo() {
         const resp = await apiNode.get('/products');
         const cart = localStorage.getItem('carrinho');
         if (cart) {
            setCarrinho(JSON.parse(cart));
         }
         setProdutos(resp.data);
      }

      loadInfo();
   }, []);


   return (
      <Container>
         <Menu />
         <ProductList>
            {
               produtos.map(item =>
                  (<li key={item.id}>
                     <img src={item.url_img} />
                     <strong>{item.nome}</strong>
                     <span>{`R$ ${item.preco.toFixed(2)}`}</span>
                     <button type="button" onClick={() => {
                        const array = carrinho;

                        for (let i = 0; i < carrinho.length; i++) {
                           if (item.id === carrinho[i].id) {
                              toast.warn('Esse produto já esta no carrinho');
                              return;
                           }
                        }
                        item.qtdeCarrinho = 1;
                        array.push(item);
                        setCarrinho(array);
                        toast.success('Esse produto foi adicionado ao carrinho');
                        localStorage.setItem('carrinho', JSON.stringify(array));

                     }} >Adicionar ao carrinho</button>
                  </li>)
               )
            }


         </ProductList>
      </Container>
   );
}
