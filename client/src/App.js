import { useState, useEffect, Component } from "react";
import "./App.css";
import { getNewSession, sessionEvent, verifySession } from "./lib/session";
import {
  Home,
  Header,
  About,
  Shop,
  Collabs,
  Checkout,
  Cart,
} from "./components/Public-Client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import AdminClient from "./components/Admin-Client/AdminClient";
import axios from "axios";

function App() {
  //Setup session

  //Shopping cart state
  let [shoppingCart, setShoppingCart] = useState([]);
  //session state
  let [sessionState, setSessionState] = useState(null);

  // let [invReady, setInvReady] = useState(false)

  let [Inventory, setInventory] = useState(null);
  //useEffect that runs once on render and never again after.
  // const ServerGrab = () => {
  //   // axios.get('https://localhost:3000/inventory')
  //   // .then(function (response) {
  //   //   // handle success
  //   //   console.log(response);
  //   //   setInventory(response)
  //   // })
  //   // .catch(function (error) {
  //   //   // handle error
  //   //   console.log(error);
  //   // })
  //   // .then(function () {
  //   //   // always executed
  //   //   setInvReady(true)
  //   // });
  // }
  useEffect(() => {

    // Get inv
    axios.get('http://localhost:8080/inventory')
    .then(function (response) {
      // handle success
      console.log(response);
      setInventory(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });


    //Check if sessionId from previous session is stored in the localStorage
    let prevSessionId = window.localStorage.getItem("sessionId");
    //If this value is null or "", the server will not use it. Pass it along as is.
    //
    //Establish session
    getNewSession(prevSessionId, (err, sessionObj) => {
      if (err) {
        //TODO: Handle session error here
        console.log(err);
        return;
      }
      //Set sessionState
      setSessionState(sessionObj);
      console.log("new_session", sessionObj);
      //
      //
    });
  }, []);

  //ShoppingCart
  const addToCart = (itemId) => {
    setShoppingCart(shoppingCart.concat([itemId]));
    return;
  };

  const removeFromCart = (itemId) => {
    let tempCart = shoppingCart;
    setShoppingCart([]);
    //
    tempCart.forEach((element) => {
      if (element !== itemId) {
        addToCart(itemId);
      }
    });
    return;
  };

  const cartHasItem = (itemId) => {
    return shoppingCart.includes(itemId);
  };

  const numCartItems = () => {
    return shoppingCart.length;
  };
  if (Inventory && sessionState !== null) {
    return (
      <div className="App">
        <BrowserRouter>
          <Router className="App">
            <Switch>
              <Redirect from="/home" to="/" />
              <Route
                path="/"
                exact
                render={(props) => {
                  //
                  return (
                    <page>
                      <Header numCartItems={numCartItems} />
                      <Home {...props} orders={"orders"} />
                    </page>
                  );
                }}
              />
              <Route
                path="/about"
                render={(props) => {
                  //
                  return (
                    <page>
                      <Header numCartItems={numCartItems} />
                      <About {...props} orders={"orders"} />
                    </page>
                  );
                }}
              />
              <Route
                path="/shop"
                render={(props) => (
                  <page>
                    <Header numCartItems={numCartItems} />
                    <Shop {...props} orders={"orders"} Inventory={Inventory} />
                  </page>
                )}
              />
              <Route
                path="/collabs"
                render={(props) => (
                  <page>
                    <Header numCartItems={numCartItems} />
                    <Collabs {...props} orders={"orders"} />
                  </page>
                )}
              />
              <Route
                path="/Cart"
                render={(props) => (
                  <page>
                    <Header numCartItems={numCartItems} />
                    <Cart {...props} orders={"orders"} />
                  </page>
                )}
              />
              <Route
                path="/Checkout"
                render={(props) => (
                  <page>
                    <Header numCartItems={numCartItems} />
                    <Checkout
                      {...props}
                      orders={"orders"}
                      removeFromCart={removeFromCart}
                      addToCart={addToCart}
                    />
                  </page>
                )}
              />
              <Route
                path="/admin"
                render={(props) => (
                  <page>
                    <AdminClient {...props} orders={"orders"} />
                  </page>
                )}
              />
            </Switch>
            {/* <Footer /> */}
          </Router>
        </BrowserRouter>
      </div>
    );
  }else {
    return(
      <div>
        <p>Loading</p>
      </div>
    )
  }
}

export default App;
