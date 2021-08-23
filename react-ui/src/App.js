import { useState, useEffect, Component, useCallback } from "react";
import "./App.css";
import { getNewSession, sessionEvent, verifySession } from "./lib/session";
import { Provider } from "react-redux";

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
import store from "./store/index";
import Signin from "./components/Admin-Client/Authentication/Signin";
import SingleCollabItem from "./components/Public-Client/SingleCollabItem/SingleCollabItem";
import SingleItem from "./components/Public-Client/SingleItem/SingleItem";
import { useWillMount } from "./lib/useWillMount";
function App() {
  //Shopping cart state
  let [shoppingCart, setShoppingCart] = useState([]);

  //MegaState
  let [Inventory, setInventory] = useState(null);
  let [Collabitems, setCollabitems] = useState([]);
  let [NotCollabitems, setNotCollabitems] = useState([]);
  let [CollabitemsHoodies, setCollabitemsHoodies] = useState([]);
  let [NotCollabitemsHoodies, setNotCollabitemsHoodies] = useState([]);
  let [CollabitemsTShirt, setCollabitemsTShirt] = useState([]);
  let [NotCollabitemsTShirt, setNotCollabitemsTShirt] = useState([]);
  let [CollabitemsCropTop, setCollabitemsCropTop] = useState([]);
  let [NotCollabitemsCropTop, setNotCollabitemsCropTop] = useState([]);
  let [CollabitemsLongT, setCollabitemsLongT] = useState([]);
  let [NotCollabitemsLongT, setNotCollabitemsLongT] = useState([]);
  let [CollabitemsPants, setCollabitemsPants] = useState([]);
  let [NotCollabitemsPants, setNotCollabitemsPants] = useState([]);
  let [megaState, setMegaState] = useState(null);
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("http://localhost:5000/inventory");

  let [sessionState, setSessionState] = useState(null);

  function SortInventory(result) {
    return new Promise((resolve) => {
      console.log(Inventory);
      let newCollab = [];
      let newNotCollab = [];
      // let newCollabitemsHoodies = [];
      // let newNotCollabitemsHoodies = [];
      // let newCollabitemsTShirt = [];
      // let newNotCollabitemsTShirt = [];
      // // let newCollab = []
      // // let newNotCollab = []
      // // let newCollab = []
      // // let newNotCollab = []
      // // let newCollab = []
      // // let newNotCollab = []
      // // let newCollab = []
      // // let newNotCollab = []
      Inventory.data.forEach((Item) => {
        if (Item.collab === true) {
          newCollab.push(Item);
        } else {
          newNotCollab.push(Item);
        }
      });
      setNotCollabitems(newNotCollab);
      setCollabitems(newCollab);
      Inventory.data.forEach((Item) => {
        if (Item.category === "Hoodie") {
          if (Item.collab === true) {
            let joined = CollabitemsHoodies.concat(Item);
            return setCollabitemsHoodies(joined);
          } else {
            let joined = NotCollabitemsHoodies.concat(Item);
            return setNotCollabitemsHoodies(joined);
          }
        } else if (Item.category === "T-Shirt") {
          if (Item.collab === true) {
            let joined = CollabitemsTShirt.concat(Item);
            return setCollabitemsTShirt(joined);
          } else {
            let joined = NotCollabitemsTShirt.concat(Item);
            return setNotCollabitemsTShirt(joined);
          }
        } else if (Item.category === "Long-T") {
          if (Item.collab === true) {
            let joined = CollabitemsLongT.concat(Item);
            return setCollabitemsLongT(joined);
          } else {
            let joined = NotCollabitemsLongT.concat(Item);
            return setNotCollabitemsLongT(joined);
          }
        } else if (Item.category === "Crop-Top") {
          if (Item.collab === true) {
            let joined = CollabitemsCropTop.concat(Item);
            return setCollabitemsCropTop(joined);
          } else {
            let joined = NotCollabitemsCropTop.concat(Item);
            return setNotCollabitemsCropTop(joined);
          }
        } else if (Item.category === "Pants") {
          if (Item.collab === true) {
            let joined = CollabitemsPants.concat(Item);
            return setCollabitemsPants(joined);
          } else {
            let joined = NotCollabitemsPants.concat(Item);
            return setNotCollabitemsPants(joined);
          }
        }
      });
      setIsLoading(false);
      resolve("resolved " + result);
    });
  }

  useEffect(() => {
    setMegaState({
      ...megaState,
      Inventory,
      Collabitems,
      NotCollabitems,
      CollabitemsHoodies,
      NotCollabitemsHoodies,
      CollabitemsTShirt,
      NotCollabitemsTShirt,
      CollabitemsCropTop,
      NotCollabitemsCropTop,
      CollabitemsLongT,
      NotCollabitemsLongT,
      CollabitemsPants,
      NotCollabitemsPants,
    });
    console.log(megaState);
    setIsFetching(false);
    // }
  }, [isLoading]);

  useEffect(() => {
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

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // handle success
        setInventory(response);
      })
      // .then(()=>{
      //   return(resolve(Inventory === !null));
      // })
      .catch(function (error) {
        // handle error
        console.log(error);
        return setIsFetching(false);
      });
  }, [url]);

  useEffect(() => {
    //run if not null, this effect will run on load
    if (Inventory) {
      console.log("Hey inv changed", Inventory);
      const result2 = SortInventory().then(()=>{

      console.log(result2);
    });
  }
  }, [Inventory]);

  // #### Shopping Cart

  //Append item to global cart
  const addToCart = (Item) => {
    setShoppingCart(shoppingCart.concat([Item]));
    return;
  };

  //Debug
  useEffect(() => {
    console.log("cart_mutation: ", shoppingCart);
  }, [shoppingCart]);

  //Remove item from global cart
  const removeFromCart = (Item) => {
    let newCart = [];
    //
    shoppingCart.forEach((element) => {
      if (element && element.id !== Item.id) {
        newCart.push(element);
      }
    });
    setShoppingCart(newCart);
    return;
  };

  //Return number of items in cart
  const numCartItems = () => {
    return shoppingCart.length;
  };

  //Render
  if (Inventory && megaState !== null) {
    if (!isFetching) {
      // console.log(megaState);
      // let props={,NotCollabitemsPants,CollabitemsPants}
      return (
        <div className="App">
          <BrowserRouter>
            <Router className="App">
              <Switch>
                <Redirect from="/success" to="/" />
                <Redirect from="/cancel" to="/" />
                <Redirect from="/home" to="/" />
                <Route
                  path="/"
                  exact
                  render={(props) => {
                    //
                    return (
                      <section>
                        <Header numCartItems={numCartItems} />
                        <Home
                          {...props}
                          orders={"orders"}
                          Inventory={Inventory}
                          // megaState={megaState}
                          removeFromCart={removeFromCart}
                          addToCart={addToCart}
                        />
                      </section>
                    );
                  }}
                />
                <Route
                  path="/about"
                  render={(props) => {
                    //
                    return (
                      <section>
                        <Header numCartItems={numCartItems} />
                        <About {...props} orders={"orders"} />
                      </section>
                    );
                  }}
                />
                <Route
                  path="/shop"
                  render={(props) => (
                    <section>
                      <Header numCartItems={numCartItems} />
                      <Shop
                        {...props}
                        orders={"orders"}
                        Inventory={Inventory}
                        removeFromCart={removeFromCart}
                        megaState={megaState}
                        addToCart={addToCart}
                        shoppingCart={shoppingCart}
                        isFetching={isFetching}
                      />
                    </section>
                  )}
                />
                <Route
                  path="/collabs"
                  render={(props) => (
                    <section>
                      <Header numCartItems={numCartItems} />
                      <Collabs
                        {...props}
                        orders={"orders"}
                        Inventory={Inventory}
                        removeFromCart={removeFromCart}
                        addToCart={addToCart}
                        // Collabitems={Collabitems}
                      />
                    </section>
                  )}
                />
                <Route
                  path="/Cart"
                  render={(props) => (
                    <section>
                      <Header numCartItems={numCartItems} />
                      <Cart
                        {...props}
                        orders={"orders"}
                        removeFromCart={removeFromCart}
                        addToCart={addToCart}
                        shoppingCart={shoppingCart}
                      />
                    </section>
                  )}
                />
                <Route
                  path="/Checkout"
                  render={(props) => (
                    <section>
                      <Header numCartItems={numCartItems} />
                      <Checkout
                        {...props}
                        orders={"orders"}
                        removeFromCart={removeFromCart}
                        addToCart={addToCart}
                      />
                    </section>
                  )}
                />
                <Provider store={store}>
                  <Route
                    path="/admin"
                    render={(props) => (
                      <section>
                        <AdminClient {...props} orders={"orders"} Inventory={Inventory} />
                      </section>
                    )}
                  />
                  <Route
                    path="/admin/signin"
                    exact
                    render={(props) => {
                      return <section>{<Signin />}</section>;
                    }}
                  />
                </Provider>
              </Switch>
              {/* <Footer /> */}
            </Router>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
}
export default App;
