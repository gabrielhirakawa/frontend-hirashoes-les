import React from 'react';
import { Link } from 'react-router-dom';
 
import { Container, ProductList } from './styles';
import Menu from '../../components/Menu';
import airforce from '../../assets/airforce.jpg'
import airmax from '../../assets/airmax.png'
import jordan from '../../assets/jordan.png'

export default function Home() {
  return (
    <Container>
        <Menu />
        <ProductList>
            <li>
            <img src={airforce} />
               <strong>Tênis Air Force 1</strong>
               <span>R$ 249,90</span>
               <Link to="/product-detail"><button type="button">Ver produto</button></Link>
            </li>
            <li>
            <img src={jordan} />
               <strong>Tênis Air Jordan 4</strong>
               <span>R$ 799,90</span>
               <button type="button">Ver produto</button>
            </li>
            <li>
            <img src={airmax} />
               <strong>Tênis Air Max 90</strong>
               <span>R$ 349,90</span>
               <button type="button">Ver produto</button>
            </li>
            

        </ProductList>
    </Container>
  );
}
