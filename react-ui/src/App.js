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
  //Setup session

  //Shopping cart state
  let [shoppingCart, setShoppingCart] = useState([]);
  //session state
  let [sessionState, setSessionState] = useState(null);

  // let [invReady, setInvReady] = useState(false)

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
  const [isLoading, setIsLoading] = useState(true)
  const [url, setUrl] = useState("/inventory");

  function SortInventory(result) {
    return new Promise((resolve) => {
      console.log(Inventory);
      let newCollab = []
      let newNotCollab = []
      let newCollabitemsHoodies = []
      let newNotCollabitemsHoodies = []
      let newCollabitemsTShirt = []
      let newNotCollabitemsTShirt = []
      // let newCollab = []
      // let newNotCollab = []
      // let newCollab = []
      // let newNotCollab = []
      // let newCollab = []
      // let newNotCollab = []
      // let newCollab = []
      // let newNotCollab = []
      Inventory.data.forEach((Item) => {
        console.log(Item);
        if (Item.collab === true) {
          console.log("I FOUND A FUCKING ITEM HAHA")
          newCollab.push(<SingleCollabItem Item={Item} />);
        } else {
          console.log("I FOUND A FUCKING not collab ITEM HAHA")
          newNotCollab.push(<SingleItem Item={Item} />);
        }
      });
      setNotCollabitems(newNotCollab)
      setCollabitems(newCollab)
      setIsLoading(false)
      Inventory.data.forEach((Item) => {
        if (Item.category === "hoodie") {
          if (Item.collab === true) {
            let joined = CollabitemsHoodies.concat(
              <SingleCollabItem Item={Item} />
            );
            return(setCollabitemsHoodies(joined));
          } else {
            let joined = NotCollabitemsHoodies.concat(
              <SingleItem Item={Item} />
            );
            return(setNotCollabitemsHoodies(joined));
          }
        } else if (Item.category === "T-Shirt") {
          if (Item.collab === true) {
            let joined = CollabitemsTShirt.concat(
              <SingleCollabItem Item={Item} />
            );
            return(setCollabitemsTShirt(joined));
          } else {
            let joined = NotCollabitemsTShirt.concat(
              <SingleItem Item={Item} />
            );
            return(setNotCollabitemsTShirt(joined));
          }
        } else if (Item.category === "Long-T") {
          if (Item.collab === true) {
            let joined = CollabitemsLongT.concat(
              <SingleCollabItem Item={Item} />
            );
            return(setCollabitemsLongT(joined));
          } else {
            let joined = NotCollabitemsLongT.concat(<SingleItem Item={Item} />);
            return(setNotCollabitemsLongT(joined));
          }
        } else if (Item.category === "Crop-Top") {
          if (Item.collab === true) {
            let joined = CollabitemsCropTop.concat(
              <SingleCollabItem Item={Item} />
            );
            return(setCollabitemsCropTop(joined));
          } else {
            let joined = NotCollabitemsCropTop.concat(
              <SingleItem Item={Item} />
            );
            return(setNotCollabitemsCropTop(joined));
          }
        } else if (Item.category === "Pants") {
          if (Item.collab === true) {
            let joined = CollabitemsPants.concat(
              <SingleCollabItem Item={Item} />
            );
            return(setCollabitemsPants(joined));
          } else {
            let joined = NotCollabitemsPants.concat(<SingleItem Item={Item} />);
            return(setNotCollabitemsPants(joined));
          }
        }
      });
      resolve("resolved " + result);
    });
  }

 

  useEffect(()=>{
    // if (NotCollabitems > 0 && Collabitems > 0) {
    console.log("did it change", isLoading, Collabitems)
    console.log("running");
      console.log(Collabitems);
      console.log(Collabitems)
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
  }, [isLoading])

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
      setInventory(response)
    })
    // .then(()=>{
    //   return(resolve(Inventory === !null));
    // })
    .catch(function (error) {
      // handle error
      console.log(error);
      return (setIsFetching(false));
    });
  }, [url])

  useEffect(() => {
    //run if not null, this effect will run on load 
    if (Inventory) {
      console.log("Hey inv changed", Inventory);
      const result2 = SortInventory()
      console.log(result2);
    }
  }, [Inventory]);

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

  if (Inventory && megaState !== null) {

    if (!isFetching) {
      // console.log(megaState);
      // let props={,NotCollabitemsPants,CollabitemsPants}
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
                        <AdminClient {...props} orders={"orders"} />
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
