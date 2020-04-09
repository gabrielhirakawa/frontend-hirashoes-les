import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Account from '../pages/Account';
import Pedidos from '../pages/PedidosUser';
import PedidoProcessado from '../pages/PedidoProcessado';
import Cards from '../pages/Cards';
import Cart from '../pages/Cart';
import Trade from '../pages/Trade';
import ProductDetail from '../pages/ProductDetail';
import Payment from '../pages/Payment';
import NewProduct from '../pages/Admin/NewProduct';
import Payments from '../pages/Admin/Payments';
import Coupons from '../pages/Admin/Coupons';
import TradesAdmin from '../pages/Admin/TradesAdmin';
import Analysis from '../pages/Admin/Analysis';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Customers from '../pages/Admin/Customers';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Home} />
                <Route path="/product-detail" component={ProductDetail} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/sessions" component={Login} />
                <Route path="/register" component={Cadastro} />
                <Route path="/account" component={Account} />
                <Route path="/orders" component={Pedidos} />
                <Route path="/trade" component={Trade} />
                <Route path="/mycards" component={Cards} />
                <Route path="/cart" component={Cart} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/payment/:codigo" component={PedidoProcessado} />

                {/* Admin */}
                <Route path="/admin" exact component={AdminDashboard} />
                <Route path="/admin/newproduct" component={NewProduct} />
                <Route path="/admin/payments" component={Payments} />
                <Route path="/admin/analysis" component={Analysis} />
                <Route path="/admin/coupons" component={Coupons} />
                <Route path="/admin/trades" component={TradesAdmin} />
                <Route path="/admin/customers" component={Customers} />

            </Switch>

        </BrowserRouter>
    )
}