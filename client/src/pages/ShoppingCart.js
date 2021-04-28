import React , { Fragment, useEffect, useState} from "react";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";
import Cart from "../components/Cart";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { Link } from "react-router-dom";

function ShoppingCart() {

  const [cart, setCart]= useState([]);
//  const location = useLocation();
  var total = 0;
  const [state, dispatch] = useTodoContext();

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  var applyDiscount;

  useEffect(() => {
    console.log("cart Effect");
    getCart();
    // if(state.loggedIn) {
    //   applyDiscount = true;
    // }
    // else {
    //   applyDiscount = false;
    // }
  }, [])

  function getCart() {
    API.getCart()
    .then(res=> {
      console.log(res.data);
      setCart(res.data);
      cartNumItems = res.data.length;
      dispatch({
        type: "numCartItems",
        numItems: cartNumItems
      })
      var cartProducts = [];
      res.data.forEach(element => {
        cartProducts.push(element);
        total = total + (element.prodInfo.price * element.prodInfo.quantity);
      });

      if(state.loggedIn) {
        applyDiscount = true;
//        var discAmtCalc = ((parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt)/100)))
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: formatter.format(parseFloat(total) * parseFloat(state.discountAmt)/100)
        });
      }
      else {
        applyDiscount = false;
//        var discAmtCalc = parseFloat(total) * parseFloat(state.discountAmt)/100;
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: 0
        });
      }
      if(state.loggedIn) {
        var salesTaxCalc;
        var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
        salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
        dispatch({
          type: "salesTaxAmt",
          discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
          salesTaxAmt: formatter.format(salesTaxCalc)
        })
      }
      else {
        salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
        console.log("sales tax = " + salesTaxCalc);
        dispatch({
          type: "salesTaxAmt",
          discountTotal: 0,
          salesTaxAmt: formatter.format(salesTaxCalc)
        })
      }
    })
    .catch(err => console.log(err))
  }

  function updateCartTotal() {
    var cartProducts = [];
    cart.forEach(element => {
      total = total + (element.prodInfo.price * element.prodInfo.quantity);
      cartProducts = [...cart];
    })
    if(state.loggedIn) {
      applyDiscount = true;
      var discAmtCalc = (parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt/100)))
        dispatch({
          type: "cartTotal",
          subTotal: formatter.format(total),
          cartItems: cartProducts,
          discount: applyDiscount,
          discountTotal: formatter.format(parseFloat(discAmtCalc) * parseFloat(state.discountAmt)/100)
        });
      }
    else {
      applyDiscount = false;
      dispatch({
        type: "cartTotal",
        subTotal: formatter.format(total),
         cartItems: cartProducts,
         discount: applyDiscount,
         discountTotal: 0
      });
    }
    if(state.loggedIn) {
      var salesTaxCalc;
      var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
      salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
      dispatch({
        type: "salesTaxAmt",
        discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
        salesTaxAmt: formatter.format(salesTaxCalc)
      })
    }
    else {
      salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
      dispatch({
        type: "salesTaxAmt",
        discountTotal: 0,
        salesTaxAmt: formatter.format(salesTaxCalc)
      })
    }
  }

  function quantityUpdate(newQuantity, index) {
    const newArray = [...cart];
    newArray[index].prodInfo.quantity = newQuantity;
    setCart(newArray);
    updateCartTotal();
  }

  function handleDecBtnClick(e) {
    var index;
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

    API.updateCart(cart[index]._id, cart[index])
    .then(res=> {
      console.log(res.data);
    })
  }

  function handleIncBtnClick(e) {
    var index;
    for (var i=0; i<cart.length; i++) {
      if ( cart[i]._id === e.target.id ) {
        index = i;
        break;
      }
    }
    var newQuantity = cart[index].prodInfo.quantity + 1;
    quantityUpdate(newQuantity, index);

    API.updateCart(cart[index]._id, cart[index])
    .then(res=> {
      console.log(res.data);
    })
  }

  var cartNumItems;

  function handleRemoveClick (e) {
console.log(e.target.id);
    API.deleteCartItem(e.target.id)
      .then(res => {
        console.log(res.data);
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