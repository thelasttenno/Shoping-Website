import { useState, useEffect, useCallback } from "react";
// import { getNewSession, Event, verifySession } from "./lib/session";
import { Provider } from "react-redux";

import {
  Home,
  Header,
  Footer,
  About,
  Shop,
  Collabs,
  Checkout,
  Cart,
  Gallery,
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
import Success from "./components/Public-Client/Success/Success";
import Cancel from "./components/Public-Client/Cancel/Cancel";
import "./App.css";

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
  let [CollabitemsSweatPants, setCollabitemsSweatPants] = useState([]);
  let [NotCollabitemsSweatPants, setNotCollabitemsSweatPants] = useState([]);
  let [CollabitemsLongT, setCollabitemsLongT] = useState([]);
  let [NotCollabitemsLongT, setNotCollabitemsLongT] = useState([]);
  let [CollabitemsSocks, setCollabitemsSocks] = useState([]);
  let [NotCollabitemsSocks, setNotCollabitemsSocks] = useState([]);
  let [CollabitemsStickers, setCollabitemsStickers] = useState([]);
  let [NotCollabitemsStickers, setNotCollabitemsStickers] = useState([]);

  let [megaState, setMegaState] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [url] = useState("http://localhost:4242/inventory");
  const [url] = useState("/inventory");
  const [token, setToken] = useState(undefined);

  const readCookie = useCallback(async () => {
    try {
      // const res = await axios.get("http://localhost:4242/read-cookie");
      const res = await axios.get("/read-cookie");


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
      // await axios.get("http://localhost:4242/clear-cookie");
      await axios.get("/clear-cookie");
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
      let newCollabitemsSweatPants = [];
      let newNotCollabitemsSweatPants = [];
      let newCollabitemsSocks = [];
      let newNotCollabitemsSocks = [];
      let newCollabitemsStickers = [];
      let newNotCollabitemsStickers = [];

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
            newCollabitemsSweatPants.push(Item);
          } else {
            newNotCollabitemsSweatPants.push(Item);
          }
        } else if (Item.category === "Pants") {
          if (Item.collab === true) {
            newCollabitemsSocks.push(Item);
          } else {
            newNotCollabitemsSocks.push(Item);
          }
        } else if (Item.category === "Stickers") {
          if (Item.collab === true) {
            newCollabitemsStickers.push(Item);
          } else {
            newNotCollabitemsStickers.push(Item);
          }
        }
      });
      setCollabitemsHoodies(newCollabitemsHoodies);
      setNotCollabitemsHoodies(newNotCollabitemsHoodies);
      setCollabitemsTShirt(newCollabitemsTShirt);
      setNotCollabitemsTShirt(newNotCollabitemsTShirt);
      setCollabitemsLongT(newCollabitemsLongT);
      setNotCollabitemsLongT(newNotCollabitemsLongT);
      setCollabitemsSweatPants(newCollabitemsSweatPants);
      setNotCollabitemsSweatPants(newNotCollabitemsSweatPants);
      setCollabitemsSocks(newCollabitemsSocks);
      setNotCollabitemsSocks(newNotCollabitemsSocks);
      setCollabitemsStickers(newCollabitemsStickers);
      setNotCollabitemsStickers(newNotCollabitemsStickers);
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
      CollabitemsSweatPants,
      NotCollabitemsSweatPants,
      CollabitemsLongT,
      NotCollabitemsLongT,
      CollabitemsSocks,
      NotCollabitemsSocks,
      CollabitemsStickers,
      NotCollabitemsStickers,
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
        console.log(response);
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
      // let props={,NotCollabitemsSocks,CollabitemsSocks}
      return (
        <div className="App">
          <BrowserRouter>
            <Router className="App">
              <Header
                numCartItems={numCartItems}
                deleteCookie={deleteCookie}
                token={token}
              />
              <Switch>
                <Redirect from="/home" to="/" />
                <Route
                  path="/"
                  exact
                  render={(props) => {
                    //
                    return (
                      <section>
                        <Home
                          {...props}
                          orders={"orders"}
                          Inventory={Inventory}
                          removeFromCart={removeFromCart}
                          addToCart={addToCart}
                          shoppingCart={shoppingCart}
                          addSingleItemToCart={addSingleItemToCart}
                          removeSingleItemFromCart={removeSingleItemFromCart}
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
                        <About {...props} orders={"orders"} />
                      </section>
                    );
                  }}
                />
                <Route
                  path="/shop"
                  render={(props) => (
                    <section>
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
                      <Checkout
                        {...props}
                        orders={"orders"}
                        removeFromCart={removeFromCart}
                        addToCart={addToCart}
                      />
                    </section>
                  )}
                />
                                <Route
                  path="/Gallery"
                  render={(props) => (
                    <section>
                      <Gallery
                        {...props}
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
                  <Route
                    path="/success"
                    exact
                    render={(props) => {
                      return (
                        <section>
                          {<Success {...props} setToken={setToken} />}
                        </section>
                      );
                    }}
                  />
                  <Route
                    path="/cancel"
                    exact
                    render={(props) => {
                      return (
                        <section>
                          {<Cancel {...props} setToken={setToken} />}
                        </section>
                      );
                    }}
                  />
                </Provider>
              </Switch>
              <Footer />
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
