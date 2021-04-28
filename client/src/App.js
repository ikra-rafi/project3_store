import './App.css';
import React from "react";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import ShoppingCart from "./pages/ShoppingCart";
import Footer from "./components/Footer";
import AllProducts from "./pages/AllProducts";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Comments from "./pages/Comments";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import AddProducts from "./pages/AddProducts";
import Review from "./pages/Review";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div id="app-content">
          <Header />
          <NavMenu />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/admin" component={Admin} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/products" component={AllProducts} />
            <Route path="/comments" component={Comments} />
            <Route path="/review/:name/:id" component={Review} />
            <Route path="/thankyou" component={ThankYou} />
            <Route path="/addproducts" component={AddProducts} />
            <Route path="/orderhistory" component={OrderHistory} />
          </Switch>
          < Footer />

      </div>
    </Router>
  );
}

export default App;

