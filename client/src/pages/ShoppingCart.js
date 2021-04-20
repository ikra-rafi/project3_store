import React , { useEffect, useState} from "react";
// import CartOrderContext from "../utils/cartOrderContext.js";
import { useTodoContext} from "../utils/store";
import Cart from "../components/Cart";
import {Container} from "../components/Test/Grid";
import API from "../utils/API";
import { Link, useLocation } from "react-router-dom";

function ShoppingCart() {

  const [cart, setCart]= useState([]);
  const location = useLocation();
  var total = 0;
  const [state, dispatch] = useTodoContext();

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });
 
  useEffect(() => {
    console.log("cart Effect");
    getCart();
    dispatch({
      type: "cartTotal",
      subTotal: formatter.format(total),
      salesTaxAmt: formatter.format(total * (state.salesTax/100)),
      orderTotal: formatter.format(state.subTotal * (state.salesTax/100) + state.shipFee + total),
      cartItems: cart
    });
  }, [])

  function getCart() {
    API.getCart()
    .then(res=> {
      console.log(res.data);
      setCart(res.data);
      var cartProducts = [];
      res.data.forEach(element => {
        cartProducts.push(element);
        total = total + (element.prodInfo.price * element.prodInfo.quantity);
      });
      dispatch({
        type: "cartTotal",
        subTotal: formatter.format(total),
        salesTaxAmt: formatter.format(total * (state.salesTax/100)),
        orderTotal: formatter.format(state.subTotal * (state.salesTax/100) + state.shipFee + total),
        cartItems: cartProducts
      });
    })
    .catch(err => console.log(err))
  }

  function updateCartTotal() {

    cart.forEach(element => {
      total = total + (element.prodInfo.price * element.prodInfo.quantity);
      dispatch({
        type: "cartTotal",
        subTotal: formatter.format(total),
        salesTaxAmt: formatter.format(total * (state.salesTax/100)),
        orderTotal: formatter.format(state.subTotal * (state.salesTax/100) + state.shipFee + total),
        cartItems: cart
      });
    });
  }

  function quantityUpdate(newQuantity, index) {
    const newArray = [...cart];
    newArray[index].prodInfo.quantity = newQuantity;
    setCart(newArray);
    updateCartTotal();
  }

  function handleDecBtnClick(e) {
    var index;
    // 
    for (var i=0; i<cart.length; i++) {
      if ( cart[i]._id === e.target.id ) {
        index = i;
        break;
      }
    }
    var newQuantity = cart[index].prodInfo.quantity - 1; 
    if(newQuantity <= 0) {
      newQuantity = 0;
    }
    quantityUpdate(newQuantity, index);
  }

  function handleIncBtnClick(e) {
    var index;
    // 
    for (var i=0; i<cart.length; i++) {
      if ( cart[i]._id === e.target.id ) {
        index = i;
        break;
      }
    }
    var newQuantity = cart[index].prodInfo.quantity + 1;

    quantityUpdate(newQuantity, index);
  }

  return (
    <div>
      <Container fluid>
        <Container>
        <Cart />
          <div className="container-fluid containerColor marginBottomCont">
            <h1 className="text-center">Shopping Cart</h1>
            {cart.length ? (
              <div>
                  <table className="table table-curved table-responsive">
                    <thead>
                      <tr>
                        <th className="alignCenter">Product</th>
                        <th className="alignCenter">Package Size</th>
                        <th className="alignCenter">Quantity</th>
                        <th className="alignCenter">Price</th>
                        <th className="alignCenter">Item Total</th>
                      </tr>
                    </thead>
                    <tbody >
                      {cart.map(result => (
                        <tr key={result._id}>
                          <td className="align-middle text-center"><p>{result.name}</p></td>
                          <td className="align-middle text-center"><p>{result.prodInfo.size}</p></td>
                          <td className="align-middle text-center">
                            <div className="row" style={{display: 'inline-block'}}>
                              <button onClick={handleDecBtnClick}><i id={result._id} className="fa fa-minus"></i></button>
                              {result.prodInfo.quantity}
                              <button id={result._id} onClick={handleIncBtnClick}><i id={result._id} className="fa fa-plus buttons"></i></button>
                            </div>
                          </td>
                          <td className="align-middle text-center"><p>{result.prodInfo.price}</p></td>
                          <td className="align-middle text-center"><p>${formatter.format(result.prodInfo.price * result.prodInfo.quantity)}</p></td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>SubTotal:</td>
                        <td>${formatter.format(state.subTotal)}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Discount ({state.discountAmt}%)</td>
                        <td>${state.discountAmt/100 * state.subTotal}</td>
                      </tr>
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sales Tax ({state.salesTax}%)</td>
                        <td>${state.salesTaxAmt}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping Fee (Flat Rate):</td>
                        <td>${state.shipFee}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Order Total:</td>
                        <td>${state.orderTotal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="row text-center h-100">
                  <div className="col-md-12 text-center my-auto">
                    <h3><strong>No Saved Cart</strong></h3>
                  </div>
                </div>
              )}
          </div>
          <Link className="mr-auto brand btn myButton buttonMargin font-weight-bold" to="/checkout" >
              Checkout
          </Link>
        </Container>
      </Container>
    </div>
  );
}

export default ShoppingCart;