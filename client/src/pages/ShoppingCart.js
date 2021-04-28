import React , { Fragment, useEffect, useState} from "react";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";
import Cart from "../components/Cart";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { Link } from "react-router-dom";

function ShoppingCart() {

  // state variables
  const [cart, setCart]= useState([]);
  const [state, dispatch] = useTodoContext();
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // variable declarations
  var total = 0;
  var applyDiscount;

  useEffect(() => {
    // upon page load get items from shopping cart table
    getCart();
  }, [])

  // function to get all the items in shopping cart
  function getCart() {
    // make API route call
    API.getCart()
    .then(res=> {
      console.log(res.data);
      // store cart items in state
      setCart(res.data);
      cartNumItems = res.data.length;
      // store cart items in store
      dispatch({
        type: "numCartItems",
        numItems: cartNumItems
      })
      var cartProducts = [];
      // loop over all cart items returned to push individual items to array and calculate cart total
      res.data.forEach(element => {
        cartProducts.push(element);
        total = total + (element.prodInfo.price * element.prodInfo.quantity);
      });

      // check if user logged in to determine if discount is applied to cart items
      if(state.loggedIn) {
        applyDiscount = true;
//        var discAmtCalc = ((parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt)/100)))
        // save subTotal and discountTotal to the store along with caritems array
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: formatter.format(parseFloat(total) * parseFloat(state.discountAmt)/100)
        });
      }
      // user not logged in so no discount applied to cart total
      else {
        applyDiscount = false;
//        var discAmtCalc = parseFloat(total) * parseFloat(state.discountAmt)/100;
        // save subTotal and discountTotal to the store along with cartItems array
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: 0
        });
      }
      // check if user logged in
      if(state.loggedIn) {
        var salesTaxCalc;
        // calculate the sales tax based upon discount reducing cart total
        var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
        salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
        // save the new discounttotal and sales tax amount to the store
        dispatch({
          type: "salesTaxAmt",
          discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
          salesTaxAmt: formatter.format(salesTaxCalc)
        })
      }
      // user not logged in
      else {
        // calculate sales tax without the discount applied
        salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
        console.log("sales tax = " + salesTaxCalc);
        // save the sales tax to store and also reflect a discount of 0
        dispatch({
          type: "salesTaxAmt",
          discountTotal: 0,
          salesTaxAmt: formatter.format(salesTaxCalc)
        })
      }
    })
    .catch(err => console.log(err))
  }

  //function to update the cart total when user changes item quantities removes an item
  function updateCartTotal() {
    var cartProducts = [];
    // figure out new cart total by looping over each product 
    cart.forEach(element => {
      total = total + (element.prodInfo.price * element.prodInfo.quantity);
      cartProducts = [...cart];
    })
    // check if user logged in
    if(state.loggedIn) {
      applyDiscount = true;
      // calculate discount amount based upon user logged in
      var discAmtCalc = (parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt/100)))
      // save the subtotal, cartitems and discount amount to the store
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: formatter.format(parseFloat(discAmtCalc) * parseFloat(state.discountAmt)/100)
        });
      }
    // user not logged in
    else {
      applyDiscount = false;
      // save a discount total of 0 to the store and the regular subtotal without discount applied
      dispatch({
        type: "cartTotal",
        subTotal: formatter.format(total),
         cartItems: cartProducts,
         discount: applyDiscount,
         discountTotal: 0
      });
    }
    // check if user logged in
    if(state.loggedIn) {
      var salesTaxCalc;
      // calculate sales tax on updated cart subtotal with discount applied
      var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
      salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
      // save updated sales tax and discount total to the store
      dispatch({
        type: "salesTaxAmt",
        discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
        salesTaxAmt: formatter.format(salesTaxCalc)
      })
    }
    // user not logged in
    else {
      // calculate sales tax without discount applied to cart subtotal
      salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
      // save the updated salestax amount to the store and also set discounttotal to 0
      dispatch({
        type: "salesTaxAmt",
        discountTotal: 0,
        salesTaxAmt: formatter.format(salesTaxCalc)
      })
    }
  }

  // function to perform quantity update when user add/decs the quantity
  function quantityUpdate(newQuantity, index) {
    const newArray = [...cart];
    newArray[index].prodInfo.quantity = newQuantity;
    // save new quantity to state and then call function to update cart total
    setCart(newArray);
    updateCartTotal();
  }

  // function to change quantity based upon user clicking decrement
  function handleDecBtnClick(e) {
    var index;
    for (var i=0; i<cart.length; i++) {
      // find id of product button clicked
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

    // save the updated quantity of product to db
    API.updateCart(cart[index]._id, cart[index])
    .then(res=> {
      console.log(res.data);
    })
  }

  // function to change quantity based upon user clicking increment
  function handleIncBtnClick(e) {
    var index;
    for (var i=0; i<cart.length; i++) {
      // find id of product button clicked
      if ( cart[i]._id === e.target.id ) {
        index = i;
        break;
      }
    }
    var newQuantity = cart[index].prodInfo.quantity + 1;
    quantityUpdate(newQuantity, index);

    //save the updated quantity of product to db
    API.updateCart(cart[index]._id, cart[index])
    .then(res=> {
      console.log(res.data);
    })
  }

  var cartNumItems;

  // function that handles removing an item from cart
  function handleRemoveClick (e) {
console.log(e.target.id);
    // api call to remove item from shopping cart table
    API.deleteCartItem(e.target.id)
      .then(res => {
        console.log(res.data);
        // call getCart to retrieve current shopping cart items
        getCart();
      })
      .catch(err => console.log(err));
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Shopping Cart</title>
      <meta
        name="Shopping Cart"
        content="Organic Spices in your Shopping Cart."
      />
    </MetaTags>
    <div className="cart-page">
                {/*====================  breadcrumb area ====================*/}

                <Breadcrumb title="Shopping Cart" />

                {/*====================  End of breadcrumb area  ====================*/}


                {/*====================  Cart area ====================*/}
    <div className="shop_cart">
      <Container fluid>
        <Container>
          <Cart />
          <div className="container">
                  <div className="shop_cart_title">
                    <h2>Shopping Cart</h2>
                  </div>

                    <div className="container-fluid containerColor marginBottomCont">
                      {/* <h1 className="text-center">Shopping Cart</h1> */}
                      <br></br>
                      {cart.length ? (
                        <div>
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="table-responsive text-center">
                              <table className="table table-bordered">
                              <thead>
                                <tr className="shop_cart_tr">
                                  <th className="text-center">Product</th>
                                  <th className="text-center">Package Size</th>
                                  <th className="text-center">Quantity</th>
                                  <th className="text-center">Price</th>
                                  <th className="text-center">Item Total</th>
                                </tr>
                              </thead>
                              <tbody >
                                {cart.map(result => (
                                  <tr key={result._id}>
                                    <td className="ptitle">
                                      <div className="row" style={{display: 'inline-block'}}>
                                        <button id={result._id} className="fa fa-trash-o" onClick={handleRemoveClick}></button>
                                        {result.name}
                                      </div>
                                      {/* row inline block end */}

                                    </td>
                                    <td className="align-middle text-center"><p>{result.prodInfo.size}</p></td>
                                    <td className="align-middle text-center">
                                      <div className="row" style={{display: 'inline-block'}}>
                                        <button onClick={handleDecBtnClick} id={result._id}className="fa fa-minus"></button>
                                        {result.prodInfo.quantity}
                                        <button id={result._id}  className="fa fa-plus buttons" onClick={handleIncBtnClick}></button>
                                      </div>
                                      {/* row inline block end */}

                                    </td>
                                    <td className="align-middle text-center"><p>{result.prodInfo.price}</p></td>
                                    <td className="align-middle text-center"><p>${formatter.format(result.prodInfo.price * result.prodInfo.quantity)}</p></td>
                                  </tr>
                                ))}


                              </tbody>
                            </table>
                            </div>
                            </div>
                            </div>


                            <div className="shop_cart_bottom">
                              <div className="container">
                                    <div className="row">

                                    <div className="col-lg-4 col-sm-12">
                                          <div className="discount-coupon">
                                              <h4>Wish List</h4>
                                              <p>Not ready to purchase? Save for later!</p>

                                              <Link to="/cart" className="app-coupon">Save</Link>
                                          </div>
                                      </div>

                                      <div className="col-lg-4 col-sm-12">
                                          <div className="discount-coupon">
                                              <h4>Discount Code</h4>
                                              <p>Enter your coupon code if you have one.</p>
                                              <form action="#">
                                                  <input className="coupon" type="text" />
                                              </form>
                                              <Link to="/cart" className="app-coupon">Apply</Link>
                                          </div>
                                      </div>
                                <div className="col-lg-4 col-sm-12">
                                <div className="grand-total-area">
                                <h4>Cart SubTotal</h4>

                                  <p className="sub-total">SubTotal:
                                  <span className="amt">${formatter.format(state.subTotal)}</span></p>


                                {state.discount ? (

                                    <p className="discount">Discount ({state.discountAmt}%)
                                    <span className="amt">${formatter.format(state.discountAmt/100 * state.subTotal)}</span></p>

                                ) : (

                                  <p className="discount">No discount applied
                                  <span className="amt"></span></p>

                                )}

                                  <p className="amt">Sales Tax ({state.salesTax}%)
                                  <span className="amt">${state.salesTaxAmt}</span></p>


                                  <p className="delivery">Shipping Fee (Flat Rate):
                                  <span className="amt">${state.shipFee}</span></p>


                                <Link className="pro-checkout"
                            // "mr-auto brand btn myButton buttonMargin font-weight-bold"
                            to="/checkout" >
                              Checkout
                            </Link>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                          </div>

                        ) : (
                          <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                              <h3><strong>No Saved Items in Cart</strong></h3>
                              <br></br>
                            </div>
                          </div>

                        )}
                    </div>
                    </div>
                  </Container>
                </Container>
  {/* shop_cart */}
  </div>
  {/* cart page*/}
  </div>
  </Fragment>

  );
}

export default ShoppingCart;