import { useState, useEffect } from "react";
import "./App.css";
import { getNewSession, verifySession } from "./lib/session";
import { Home, Header, About, Shop, Collabs } from "./components/Public-Client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import AdminClient from "./components/Admin-Client/AdminClient";

function App() {
  //Setup session

  /** these allow the session to track page transitions and build out navigation datasets. this is useful for calculating the effectiveness of click-through conversions */
  let [currentPage, setCurrentPage] = useState("");
  let [lastPageVisited, setLastPageVisited] = useState("");
  //session state
  let [sessionState, setSessionState] = useState(null);

  //useEffect that runs once on render and never again after.
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
                return (
                  <page>
                    <Header />
                    <Home {...props} orders={"orders"} />
                  </page>
                );
              }}
            />
            <Route
              path="/about"
              render={(props) => {
                return (
                  <page>
                    <Header />
                    <About {...props} orders={"orders"} />
                  </page>
                );
              }}
            />
            <Route
              path="/shop"
              render={(props) => (
                <page>
                  <Header />
                  <Shop {...props} orders={"orders"} />
                </page>
              )}
            />
            <Route
              path="/collabs"
              render={(props) => (
                <page>
                  <Header />
                  <Collabs {...props} orders={"orders"} />
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
}

export default App;
