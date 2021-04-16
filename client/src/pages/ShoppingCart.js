import React , { useEffect, useState} from "react";
// import Container from "../components/Container";
import Cart from "../components/Cart";
//import CreditCard from "../components/CreditCard";
import CartData from "../components/Test/CartData"
import {Row, Container} from "../components/Test/Grid";
import API from "../utils/API";
import { Link, useLocation } from "react-router-dom";

function ShoppingCart() {

  const [cart, setCart]= useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [trigger, setTrigger] = useState({trigger: 1});
  const location = useLocation();
  var total = 0;

  useEffect(() => {
    console.log("cart Effect");
    getCart();
  }, [])

  function getCart() {
    API.getCart()
    .then(res=> {
      console.log(res.data);
      setCart(res.data);
      res.data.forEach(element => {
        total = total + (element.prodInfo.price * element.prodInfo.quantity);
        setCartTotal(total);
      });
    })
    .catch(err => console.log(err))
  }

  function updateCartTotal() {
    cart.forEach(element => {
      total = total + (element.prodInfo.price * element.prodInfo.quantity);
      setCartTotal(total);
    });
  }

  function handleDecBtnClick(e) {
    var index;
    // loop over saved books to find the object ID that matches the save button
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

    const newArray = [...cart];
    newArray[index].prodInfo.quantity = newQuantity;
    setCart(newArray);
    updateCartTotal();
  }

  function handleIncBtnClick(e) {
    var index;
    // loop over saved books to find the object ID that matches the save button
    for (var i=0; i<cart.length; i++) {
      if ( cart[i]._id === e.target.id ) {
        index = i;
        break;
      }
    }
    var newQuantity = cart[index].prodInfo.quantity + 1;

    const newArray = [...cart];
    newArray[index].prodInfo.quantity = newQuantity;
    setCart(newArray);
    updateCartTotal();
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
                        <th className="alignCenter">SubTotal</th>
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
                          <td className="align-middle text-center"><p>${result.prodInfo.price * result.prodInfo.quantity}</p></td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td>${cartTotal}</td>
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