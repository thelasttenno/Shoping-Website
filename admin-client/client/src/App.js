import React, { Component } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import Header from './components/Header/Header';
import Warehouses from './pages/Warehouse/Warehouses';
import WarehousesInventory from './components/Warehouse/warehousesInventory';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import Inventory from './pages/Inventory/Inventory';
import AddWarehouse from "./components/AddWarehouse/AddWarehouse";

import AddInventory from "./components/AddInventory/AddInventory";
import EditInventory from "./components/EditInventory/EditInventory"

import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import Footer from './components/Footer/Footer';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warehouses: null,
      inventory: null,
    };
  }

  handleEditWareHouse = (id, newWarehouseData) =>{
      let putURL = `http://localhost:8080/warehouses/${id}`;
      axios
        .put(putURL, {data: newWarehouseData})
        .then(response =>{
            this.setState({warehouses: response.data});
        })
        .catch(error => console.log('New warehouse couldn"t be added', error));
  }

  handleEditInventory = (id, newInventoryData) =>{
    let putURL = `http://localhost:8080/warehouses/inventory/${id}`;
    axios
      .put(putURL, {data: newInventoryData})
      .then(response =>{
          this.setState({inventory: response.data});
      })
      .catch(error => console.log('New inventory couldn"t be added', error));
}

  componentDidMount() {
    let one = axios.get(`http://localhost:8080/warehouses`);
    let two = axios.get(`http://localhost:8080/inventory`);
    axios
      .all([one, two])
      .then(
        axios.spread((...responses) => {
          this.setState({
            warehouses: responses[0].data,
            inventory: responses[1].data,

          });
        })
      )
      .catch((errors) => { });
  }

componentDidUpdate(prevProps) {
    if (this.props.match !== undefined && prevProps.match.params.id !== this.props.match.params) {
      let one = axios.get(`http://localhost:8080/warehouses`);
      let two = axios.get(`http://localhost:8080/warehouses/inventory`);
      axios
        .all([one, two])
        .then(
          axios.spread((...responses) => {
            this.setState({
              warehouses: responses[0].data,
              inventory: responses[1].data,
            });
          })
        )
        .catch((errors) => { });
    }
  }

  render() {
    if (this.state.inventory !== null && this.state.warehouses !== null) {
    return (
      <div className="App">
        <BrowserRouter>
        <Router className="App">
          <Header />
          <Switch>
            <Redirect from='/home' to='/'/>
            <Route path='/' exact
                render={(props) => (
                    <Warehouses {...props} warehouses={this.state.warehouses} />
                )} 
            />
            <Route  
                path="/Warehouses" exact
                render={(props) => (
                    <Warehouses {...props} warehouses={this.state.warehouses} inventory={this.state.inventory}/>
                )} 
            />
             <Route  
                path="/Warehouses/:warehouseId/edit-warehouse" exact
                render={(props) => (
                    <EditWarehouse {...props} warehouse={this.state.warehouses.find(el => el.id === props.match.params.warehouseId)}
                         handleEditWareHouse = {this.handleEditWareHouse}/>
                )} 
            />
            <Route  
                path="/addwarehouse"
                render={(props) => (
                    <AddWarehouse {...props} inventory={this.state.inventory} />
                )} 
            />
            <Route  
                path="/:warehouseId/inventory"
                render={(props) => (
                    <WarehousesInventory {...props} inventory={this.state.inventory} warehouses={this.state.warehouses}/>
                )} 
            />
            <Route  
                path="/inventory" exact
                render={(props) => (
                    <Inventory {...props} inventory={this.state.inventory} />
                )} 
            />
            <Route  
                path="/inventory/new-inventory"
                render={(props) => (
                    <AddInventory {...props}  />
                )} 
            />
            <Route  
                path="/inventory/:inventoryId/edit-inventory"
                render={(props) => (
                    <EditInventory {...props} 
                    inventory={this.state.inventory.find(el => el.id === props.match.params.inventoryId)}
                    categoryList={[...new Set(this.state.inventory.map(el => el.category))]}
                    warehouseList={[...new Set(this.state.warehouses.map(el => el.name))]}
                    handleEditInventory={this.handleEditInventory} />
                )} 
            />
            <Route  
                path="/inventory/:inventoryId"
                render={(props) => (
                    <InventoryDetails {...props} 
                    inventory={this.state.inventory}/>
                )} 
            />
          </Switch>
          <Footer />
        </Router>
      </BrowserRouter>
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
export default App;
