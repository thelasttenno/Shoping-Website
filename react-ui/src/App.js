import { useState, useEffect, useCallback } from "react";
import "./App.css";
// import { getNewSession, Event, verifySession } from "./lib/session";
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
// import SingleCollabItem from "./components/Public-Client/SingleCollabItem/SingleCollabItem";
// import SingleItem from "./components/Public-Client/SingleItem/SingleItem";
// import { useWillMount } from "./lib/useWillMount";
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
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [url] = useState("http://localhost:4242/inventory");
  const [token, setToken] = useState(undefined);


  const readCookie = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4242/read-cookie");

      if (res.data.token !== undefined) {
        await setToken(res.data.token);
      }
    } catch (e) {
      await setToken(undefined);
      console.log(e);
    }
  }, []);

  useEffect(() => {
    readCookie();
  }, [readCookie]);

  // function PrivateRoute({ children, ...rest }) {
  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) => {
  //         return rest.token !== undefined ? (
  //           children
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/SignIn",
  //               state: { from: location },
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // }

  const deleteCookie = async () => {
    try {
      await axios.get("http://localhost:4242/clear-cookie");
      setToken(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  function SortInventory(result) {
    return new Promise((resolve) => {
      console.log(Inventory);
      let newCollab = [];
      let newNotCollab = [];
      let newCollabitemsHoodies = [];
      let newNotCollabitemsHoodies = [];
      let newCollabitemsTShirt = [];
      let newNotCollabitemsTShirt = [];
      let newCollabitemsLongT = [];
      let newNotCollabitemsLongT = [];
      let newCollabitemsCropTop = [];
      let newNotCollabitemsCropTop = [];
      let newCollabitemsPants = [];
      let newNotCollabitemsPants = [];
      // // let newCollab = []
      // // let newNotCollab = []
      Inventory.data.forEach((Item) => {
        Item.quantity = 0;
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
            newCollabitemsHoodies.push(Item);
          } else {
            newNotCollabitemsHoodies.push(Item);
          }
        } else if (Item.category === "T-Shirt") {
          if (Item.collab === true) {
            newCollabitemsTShirt.push(Item);
          } else {
            newNotCollabitemsTShirt.push(Item);
          }
        } else if (Item.category === "Long-T") {
          if (Item.collab === true) {
            newCollabitemsLongT.push(Item);
          } else {
            newNotCollabitemsLongT.push(Item);
          }
        } else if (Item.category === "Crop-Top") {
          if (Item.collab === true) {
            newCollabitemsCropTop.push(Item);
          } else {
            newNotCollabitemsCropTop.push(Item);
          }
        } else if (Item.category === "Pants") {
          if (Item.collab === true) {
            newCollabitemsPants.push(Item);
          } else {
            newNotCollabitemsPants.push(Item);
          }
        }
      });
      setCollabitemsHoodies(newCollabitemsHoodies);
      setNotCollabitemsHoodies(newNotCollabitemsHoodies);
      setCollabitemsTShirt(newCollabitemsTShirt);
      setNotCollabitemsTShirt(newNotCollabitemsTShirt);
      setCollabitemsLongT(newCollabitemsLongT);
      setNotCollabitemsLongT(newNotCollabitemsLongT);
      setCollabitemsCropTop(newCollabitemsCropTop);
      setNotCollabitemsCropTop(newNotCollabitemsCropTop);
      setCollabitemsPants(newCollabitemsPants);
      setNotCollabitemsPants(newNotCollabitemsPants);
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

  // useEffect(() => {
  //   //Check if sessionId from previous session is stored in the localStorage
  //   let prevSessionId = window.localStorage.getItem("sessionId");
  //   //If this value is null or "", the server will not use it. Pass it along as is.
  //   //
  //   //Establish session
  //   getNewSession(prevSessionId, (err, sessionObj) => {
  //     if (err) {
  //       //TODO: Handle session error here
  //       console.log(err);
  //       return;
  //     }
  //     //Set sessionState
  //     setSessionState(sessionObj);
  //     console.log("new_session", sessionObj);
  //     //
  //     //
  //   });
  // }, []);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // handle success
        setInventory(response);
      })
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
      const result2 = SortInventory().then(() => {
        console.log(result2);
      });
    }
  }, [Inventory]);

  // #### Shopping Cart

  //Append item to global cart
  const addToCart = (Item) => {
    console.log("addToCart", Item);
    Item.quantity = Item.quantity + 1;
    setShoppingCart(shoppingCart.concat([Item]));
    return;
  };

  const addSingleItemToCart = (Item) => {
    Item.quantity = Item.quantity + 1;
    let newCart = [];
    shoppingCart.forEach((element) => {
      if (element && element.id !== Item.id) {
        newCart.push(element);
      } else {
        console.log(element);
        newCart.push(element);
      }
    });
    setShoppingCart(newCart);
  };
  const removeSingleItemFromCart = (Item) => {
    console.log("removeSingleItemFromCart", Item);
    Item.quantity = Item.quantity - 1;
    let newCart = [];
    shoppingCart.forEach((element) => {
      if (element && element.id !== Item.id) {
        newCart.push(element);
      } else if (Item.quantity > 0 && element.id === Item.id) {
        console.log(element);
        newCart.push(element);
      }
    });
    setShoppingCart(newCart);
  };

  //Debug
  useEffect(() => {
    console.log("cart_mutation: ", shoppingCart);
  }, [shoppingCart]);

  //Remove item from global cart
  const removeFromCart = (Item) => {
    Item.quantity = 0;
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
                        <Header
                          numCartItems={numCartItems}
                          deleteCookie={deleteCookie}
                          token={token}
                        />
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
                        <Header
                          numCartItems={numCartItems}
                          deleteCookie={deleteCookie}
                          token={token}
                        />
                        <About {...props} orders={"orders"} />
                      </section>
                    );
                  }}
                />
                <Route
                  path="/shop"
                  render={(props) => (
                    <section>
                      <Header
                        numCartItems={numCartItems}
                        deleteCookie={deleteCookie}
                        token={token}
                      />
                      <Shop
                        {...props}
                        orders={"orders"}
                        Inventory={Inventory}
                        removeFromCart={removeFromCart}
                        megaState={megaState}
                        addToCart={addToCart}
                        shoppingCart={shoppingCart}
                        isFetching={isFetching}
                        addSingleItemToCart={addSingleItemToCart}
                        removeSingleItemFromCart={removeSingleItemFromCart}
                      />
                    </section>
                  )}
                />
                <Route
                  path="/collabs"
                  render={(props) => (
                    <section>
                      <Header
                        numCartItems={numCartItems}
                        deleteCookie={deleteCookie}
                        token={token}
                      />
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
                      <Header
                        numCartItems={numCartItems}
                        deleteCookie={deleteCookie}
                        token={token}
                      />
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
                      <Header
                        numCartItems={numCartItems}
                        deleteCookie={deleteCookie}
                        token={token}
                      />
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
                      render={(props) => {
                        return (
                          <section>
                            <AdminClient
                              {...props}
                              orders={"orders"}
                              Inventory={Inventory}
                              deleteCookie={deleteCookie}
                              token={token}
                            />
                          </section>
                        );
                      }}
                    />
                  <Route
                    path="/signin"
                    exact
                    render={(props) => {
                      return (
                        <section>{<Signin setToken={setToken} />}</section>
                      );
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
