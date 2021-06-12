import "./App.css";
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
  return (
    <div className="App">
      <BrowserRouter>
        <Router className="App">
          <Switch>
            <Redirect from="/home" to="/" />
            <Route
              path="/"
              exact
              render={(props) => (
                <page>
                  <Header />
                  <Home {...props} orders={"orders"} />
                </page>
              )}
            />
            <Route
              path="/about"
              render={(props) => (
                <page>
                  <Header />
                  <About {...props} orders={"orders"} />
                </page>
              )}
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
