//import logo from './logo.svg';
import './App.css';
import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import ShoppingCart from "./pages/ShoppingCart";
import Footer from "./components/Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./pages/Checkout";
import john from "./pages/login-form";
import johnSignup from "./pages/sign-up";

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div id="app-content">
          <Nav />
          <Hero />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/details" component={ProductDetails} />
            <Route path="/admin" component={Admin} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/checkout" component={Checkout} />
<<<<<<< HEAD
            <Route path="/products" component={AllProducts} />
            <Route path="/john" component={john} />
            <Route path="/johnSignup" component={johnSignup} />
=======
>>>>>>> parent of f1062d7... Updates to Products pages
          </Switch>
          < Footer />

      </div>
    </Router>
  );
}

export default App;

