import React, { Component } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import Header from './Header/Header';
import Orders from '../../pages/Order/Orders';
import OrdersInventory from './Order/OrderInventory';
import Editorder from './EditOrder/EditOrder';
import Inventory from '../../pages/Inventory/Inventory';
import Addorder from "./AddOrder/AddOrder.js";

import AddInventory from "./AddInventory/AddInventory";
import EditInventory from "./EditInventory/EditInventory"

import InventoryDetails from "./InventoryDetails/InventoryDetails";
import Footer from './Footer/Footer';
import Login from './login/Login.jsx'
class AdminClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: null,
      inventory: null,
    };
  }

  handleEditorder = (id, neworderData) =>{
      let putURL = `http://localhost:8080/orders/${id}`;
      axios
        .put(putURL, {data: neworderData})
        .then(response =>{
            this.setState({orders: response.data});
        })
        .catch(error => console.log('New order couldn"t be added', error));
  }

  handleEditInventory = (id, newInventoryData) =>{
    let putURL = `http://localhost:8080/orders/inventory/${id}`;
    axios
      .put(putURL, {data: newInventoryData})
      .then(response =>{
          this.setState({inventory: response.data});
      })
      .catch(error => console.log('New inventory couldn"t be added', error));
}

  componentDidMount() {
    let one = axios.get(`http://localhost:8080/orders`);
    let two = axios.get(`http://localhost:8080/inventory`);
    axios
      .all([one, two])
      .then(
        axios.spread((...responses) => {
          this.setState({
            orders: responses[0].data,
            inventory: responses[1].data,

          });
        })
      )
      .catch((errors) => { });
  }

componentDidUpdate(prevProps) {
    if (this.props.match !== undefined && prevProps.match.params.id !== this.props.match.params) {
      let one = axios.get(`http://localhost:8080/orders`);
      let two = axios.get(`http://localhost:8080/inventory`);
      axios
        .all([one, two])
        .then(
          axios.spread((...responses) => {
            this.setState({
              orders: responses[0].data,
              inventory: responses[1].data,
            });
          })
        )
        .catch((errors) => { });
    }
  }

  render() {
    if (this.state.inventory !== null && this.state.orders !== null) {
    return (
      <div className="App">
          <Header />
          <Switch>
            <Route path='/admin' exact
                render={(props) => (
                    <Login {...props} orders={this.state.orders} />
                )} 
            />
            <Route  
                path="/admin/orders" exact
                render={(props) => (
                    <Orders {...props} orders={this.state.orders} inventory={this.state.inventory}/>
                )} 
            />
             <Route  
                path="/admin/orders/:orderId/edit-order" exact
                render={(props) => (
                    <Editorder {...props} order={this.state.orders.find(el => el.id === props.match.params.orderId)}
                         handleEditorder = {this.handleEditorder}/>
                )} 
            />
            <Route  
                path="/admin/addorder"
                render={(props) => (
                    <Addorder {...props} inventory={this.state.inventory} />
                )} 
            />
            <Route  
                path="/admin/:orderId/inventory"
                render={(props) => (
                    <OrdersInventory {...props} inventory={this.state.inventory} orders={this.state.orders}/>
                )} 
            />
            <Route  
                path="/admin/inventory" exact
                render={(props) => (
                    <Inventory {...props} inventory={this.state.inventory} />
                )} 
            />
            <Route  
                path="/admin/inventory/new-inventory"
                render={(props) => (
                    <AddInventory {...props}  />
                )} 
            />
            <Route  
                path="/admin/inventory/:inventoryId/edit-inventory"
                render={(props) => (
                    <EditInventory {...props} 
                    inventory={this.state.inventory.find(el => el.id === props.match.params.inventoryId)}
                    categoryList={[...new Set(this.state.inventory.map(el => el.category))]}
                    orderList={[...new Set(this.state.orders.map(el => el.name))]}
                    handleEditInventory={this.handleEditInventory} />
                )} 
            />
            <Route  
                path="/admin/inventory/:inventoryId"
                render={(props) => (
                    <InventoryDetails {...props} 
                    inventory={this.state.inventory}/>
                )} 
            />
          </Switch>
          <Footer />
      </div>
    );
  }else {
    return (
    <div>
      <h1>
        LOADING
      </h1>
        </div>
      )
    }
  }
}
export default AdminClient;
