import React, { useEffect } from "react";
import axios from "axios";

import { Switch, Route, Redirect } from "react-router-dom";
import Inventory from "../../pages/Inventory/Inventory";

import AddInventory from "./AddInventory/AddInventory";
import EditInventory from "./EditInventory/EditInventory";

import InventoryDetails from "./InventoryDetails/InventoryDetails";
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
function AdminClient(props) {
  const [orders, setOrders] = React.useState(null);
  const [inventory, setInventory] = React.useState(null);

  function handleEditInventory(id, newInventoryData) {
    let putURL = `/orders/inventory/${id}`;
    axios
      .put(putURL, { data: newInventoryData })
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => console.log('New inventory couldn"t be added', error));
  }

  useEffect(() => {
    // let two = axios.get(`http://localhost:4242/inventory`);
    let two = axios.get(`/inventory`);
    axios
      .all([two])
      .then(
        axios.spread((...responses) => {
          let responseOne = responses[1].data;
          setInventory(responseOne);
        })
      )
      .catch((errors) => {});
  }, []);

  if (inventory !== null) {
    return (
      <div className="App">
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

          <PrivateRoute path="/admin/inventory" token={props.token} exact>
            <Route
              path="/admin/inventory"
              exact
              render={(props) => {
                return <Inventory {...props} inventory={inventory} />;
              }}
            />
          </PrivateRoute>
          <PrivateRoute
            path="/admin/inventory/new-inventory"
            token={props.token}
            exact
          >
            <Route
              path="/admin/inventory/new-inventory"
              exact
              render={(props) => {
                return <AddInventory {...props} />;
              }}
            />
          </PrivateRoute>
          <PrivateRoute
            path="/admin/inventory/:inventoryId/edit-inventory"
            token={props.token}
            exact
          >
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
                    handleEditInventory={handleEditInventory}
                  />
                );
              }}
            />
          </PrivateRoute>
          <PrivateRoute
            path="/admin/inventory/:inventoryId"
            token={props.token}
            exact
          >
            <Route
              path="/admin/inventory/:inventoryId"
              render={(props) => (
                <InventoryDetails {...props} inventory={inventory} />
              )}
            />
          </PrivateRoute>
        </Switch>
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
