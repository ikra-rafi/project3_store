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
import TempProducts from "./pages/test/TempProducts";
import TempOrders from "./pages/test/TempOrders";
import TempCart from "./pages/test/TempCart";
import TempRecipes from "./pages/test/TempRecipes";
import TempLogin from "./pages/test/TempLogin";
import TempComment from "./pages/test/TempComments";

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div id="app-content">
          <Nav />
          <Hero />
          <Switch>
            <Route exact path="/" component={Home}> <TempProducts /> <TempOrders /> <TempCart /> <TempRecipes /><TempComment /> <TempLogin /></Route>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/details" component={ProductDetails} />
            <Route path="/admin" component={Admin} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={ShoppingCart} /> 
          </Switch>
          < Footer />

      </div>
    </Router>
  );
}

export default App;

