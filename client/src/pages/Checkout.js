import React , { useEffect, useState} from "react";
// import Container from "../components/Container";
import Cart from "../components/Cart";
//import CreditCard from "../components/CreditCard";
import CartData from "../components/Test/CartData"
import {Row, Container} from "../components/Test/Grid";
import API from "../utils/API";

function ShoppingCart() {

  const [cart, setCart]= useState([]);
  const [trigger, setTrigger] = useState("1");
  var orderData = [];

  const storeCart = [ 
      { name: "salt",
        productID: "SA0003",
        prodInfo: {
          size: "4oz bottle",
          price: "4.99",
          quantity: 1
        }
      },
      {
        name: "ground ginger",
        productID: "GIN0002",
        prodInfo: {
          size: "16oz package",
          price: "12.99",
          quantity: 1
        }
      },
      {
        name: "chamomile tea",
        productID: "CHAM0015",
        prodInfo: {
          size: "4oz package",
          price: "5.99",
          quantity: 2
        }
      }
  ]
  useEffect(() => {
    console.log("cart Effect");
    getCart();
}, [])

function handleCartBtnClick(event) {
  API.saveCart(storeCart)
      .then(res => {
          console.log("cart");
          console.log(res.data);
          setCart(res.data);
      })
      .catch(err => console.log(err));
}

function getCart() {
  API.getCart()
  .then(res=> {
      console.log(res.data);
      setCart(res.data);
  })
  .catch(err => console.log(err))
}

  return (
    <div>
      <Container>
        <Cart />
        <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleCartBtnClick}><strong>Cart</strong></button>
   <Row>
   <div className="container-fluid containerColor marginBottomCont">
       {cart.length ? (

                               <div>
                                   {cart.map(result => (
                                       <div key={result._id}>
                                           <CartData
                                               // id = {result._id}
                                                name = {result.name}
                                               productID = {result.productID}
                                               prodInfo = {result.prodInfo}
                                           />
                                       </div>
                                     ))}
                               </div>
       ) : (
           <div className="row text-center h-100">
               <div className="col-md-12 text-center my-auto">
                   <h3><strong>No Saved Cart</strong></h3>
               </div>
           </div>
       )}
   </div>
   </Row>
      </Container>
</div>


  );
}

export default ShoppingCart;