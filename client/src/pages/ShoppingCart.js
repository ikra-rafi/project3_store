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
  useEffect(() => {
    console.log("cart Effect");
    getCart();
}, [])

var total =0;
function getCart() {
  API.getCart()
  .then(res=> {
      console.log(res.data);
      setCart(res.data);
      res.data.forEach(element => {
        console.log(element);
        console.log(element.prodInfo);
        console.log(element.prodInfo.price);
        console.log(element.prodInfo.quantity);
        console.log(element.prodInfo.price * element.prodInfo.quantity);
        total = total + (element.prodInfo.price * element.prodInfo.quantity);
        console.log(total);
        setCartTotal(total);
        console.log(cartTotal);
      });
      console.log("total="+ total);
  })
  .catch(err => console.log(err))
}

  function cartItems() {

  }

  function handleBtnClick(e) {
    e.prevent.Default();

  }
  const location = useLocation();
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

            <tr>
              <td className="align-middle text-center"><p>{result.name}</p></td>
              <td className="align-middle text-center"><p>{result.prodInfo.size}</p></td>
              <td className="align-middle text-center"><p>{result.prodInfo.quantity}</p></td>
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
        
        <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleBtnClick} ><strong>Checkout</strong></button>
        <Link className="mr-auto brand font-weight-bold" to="/checkout" >
                Checkout
            </Link>
   <Row>
   </Row>
   </Container>
   </Container>
</div>


  );
}

export default ShoppingCart;