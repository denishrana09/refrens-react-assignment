import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";
import { Home, Product, Cart } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import reportWebVitals from "./reportWebVitals";

import CartContext from "./context";

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/:id">
            <Product />
          </Route>
        </Switch>
      </Router>
    </CartContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
