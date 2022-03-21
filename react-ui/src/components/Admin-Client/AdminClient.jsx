import React, {useEffect} from "react";
import axios from "axios";

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Header/Header";
import Orders from "../../pages/Order/Orders";
import OrdersInventory from "./Order/OrderInventory";
// import Editorder from "./EditOrder/EditOrder";
import Inventory from "../../pages/Inventory/Inventory";
// import Addorder from "./AddOrder/AddOrder.js";

import AddInventory from "./AddInventory/AddInventory";
import EditInventory from "./EditInventory/EditInventory";

import InventoryDetails from "./InventoryDetails/InventoryDetails";
import Footer from "./Footer/Footer";
import AdminHome from "./AdminHome/AdminHome.jsx";



function PrivateRoute({ children, ...rest }) {
  console.log(children, "and rest", rest);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return rest.token !== undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/SignIn",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
function AdminClient (props) {
  
  const [orders, setOrders] = React.useState(null);
  const [inventory, setInventory] = React.useState(null);

  function handleEditorder (id, neworderData) {
    // let putURL = `http://localhost:4242/orders/${id}`;
    let putURL = `/orders/${id}`;
    axios
      .put(putURL, { data: neworderData })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.log('New order couldn"t be added', error));
  };

  function handleEditInventory (id, newInventoryData) {
    // let putURL = `http://localhost:4242/orders/inventory/${id}`;
    let putURL = `/orders/inventory/${id}`;
    axios
      .put(putURL, { data: newInventoryData })
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => console.log('New inventory couldn"t be added', error));
  };

  useEffect(() => {
    // let one = axios.get(`http://localhost:4242/orders`);
    let one = axios.get(`/orders`);
    // let two = axios.get(`http://localhost:4242/inventory`);
    let two = axios.get(`/inventory`);
    axios
      .all([one, two])
      .then(
        axios.spread((...responses) => {
          let responseZero = responses[0].data
          let responseOne = responses[1].data
          setOrders(responseZero);
          setInventory(responseOne);
        })
      )
      .catch((errors) => {});
  }, []);

  
    if (inventory !== null && orders !== null) {
      return (
        <div className="App">
          <Header
            deleteCookie={props.deleteCookie}
            token={props.token}
          />
          <Switch>
            <PrivateRoute path="/admin" token={props.token} exact>
              <Route
                path="/admin"
                exact
                render={() => {
                  return <AdminHome {...props} />;
                }}
              />
            </PrivateRoute>
            
            <PrivateRoute path="/admin/orders" token={props.token} exact>
            <Route
              path="/admin/orders"
              exact
              render={(props) => {
                return <Orders {...props} inventory={inventory} />;
              }}
            />
            </PrivateRoute>

            <PrivateRoute path="/admin/orders/:orderId/edit-order" token={props.token} exact>
            <Route
              path="/admin/orders/:orderId/edit-order"
              render={() => {
                return (
                  <OrdersInventory
                    {...props}
                    order={orders.find(
                      (el) => el.id === props.match.params.orderId
                    )}
                    handleEditorder={handleEditorder}
                  />
                );
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/addorder" token={props.token} exact>

            <Route
              path="/admin/addorder"
              exact
              render={() => {
                return (
                  <OrdersInventory
                    {...props}
                    inventory={inventory}
                  />
                );
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/:orderId/inventory" token={props.token} exact>

            <Route
              path="/admin/:orderId/inventory"
              render={() => {
                return (
                  <OrdersInventory
                    {...props}
                    inventory={inventory}
                  />
                );
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/inventory" token={props.token} exact>

            <Route
              path="/admin/inventory"
              exact
              render={(props) => {
                return (
                  <Inventory {...props} inventory={inventory} />
                );
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/inventory/new-inventory" token={props.token} exact>

            <Route
              path="/admin/inventory/new-inventory"
              exact
              render={(props) => {
                return <AddInventory {...props} />;
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/inventory/:inventoryId/edit-inventory" token={props.token} exact>

            <Route
              path="/admin/inventory/:inventoryId/edit-inventory"
              exact
              render={(props) => {
                return (
                  <EditInventory
                    {...props}
                    inventory={inventory.find(
                      (el) => el.id === props.match.params.inventoryId
                    )}
                    categoryList={[
                      ...new Set(inventory.map((el) => el.category)),
                    ]}
                    orderList={[
                      ...new Set(orders.map((el) => el.name)),
                    ]}
                    handleEditInventory={handleEditInventory}
                  />
                );
              }}
            />
            </PrivateRoute>
            <PrivateRoute path="/admin/inventory/:inventoryId" token={props.token} exact>

            <Route
              path="/admin/inventory/:inventoryId"
              render={(props) => (
                <InventoryDetails {...props} inventory={inventory} />
              )}
            />
            </PrivateRoute>
            
          </Switch>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  }
export default AdminClient;
