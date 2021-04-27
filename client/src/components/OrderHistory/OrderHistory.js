//import React from "react";
import React , { useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useTodoContext} from "../../utils/store";
import Cart from "../Cart";
import {Container} from "../Test/Grid";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { get } from "mongoose";

function OrderHistory() {
  
    const [cart, setCart]= useState([]);
    const [orders, setOrders] = useState([]);
    const [loginInfo, setLoginInfo] = useState();
    var total = 0;
    const [state, dispatch] = useTodoContext();
  
    let history = useHistory();

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });
   
    useEffect(() => {
      console.log("orderHistory effect");
      if(state.loggedIn) {
        getLogin();
        getOrders();
      }
      else {
        history.push('/');
      }
    }, [])
  
    function getLogin() {
      var loginObj = {
        password: "",
        email: state.email
      }
      API.getOrdersAcct(loginObj)
        .then(res => {
//          if(state.loggedIn) {
//              setLoginInfo({...loginInfo, email: state.email, _id: res.data._id})
//              console.log(res.data)
//          } else if (!state.loggedIn)
//          {
//              setLoginInfo({...loginInfo, email: "", _id: 0})
//          }
        })
        .catch(err => console.log(err));
    }

    function getOrders() {

      API.getOrders(state.email)
        .then(res => {
          console.log(res.data[0]);
          console.log(res.data[0].orderIDs)
//          console.log(res.data.OrderIDs._id);
  //        console.log(res.data.orderIDs.orderTotal);
 //         setOrders(res.data);
          var orderProducts =[];
          res.data[0].orderIDs.forEach(element => {
            orderProducts.push(element);
          })
          console.log(orderProducts);
          setOrders(orderProducts);
        })
        .catch(err => console.log(err));
      console.log(orders);
//      var orderIds = [];
//      orders.forEach(element => {

//      })
    }


  //   function getCart() {
  //     API.getCart()
  //     .then(res=> {
  //       console.log(res.data);
  //       setCart(res.data);
  //       var cartProducts = [];
  //       res.data.forEach(element => {
  //         cartProducts.push(element);
  //         total = total + (element.prodInfo.price * element.prodInfo.quantity);
  //       });
  
  //       if(state.loggedIn) {
  //         applyDiscount = true;
  // //        var discAmtCalc = ((parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt)/100)))
  //         dispatch({
  //           type: "cartTotal",
  //           subTotal: formatter.format(total),
  //           cartItems: cartProducts,
  //           discount: applyDiscount,
  //           discountTotal: formatter.format(parseFloat(total) * parseFloat(state.discountAmt)/100)
  //         });
  //       }
  //       else {
  //         applyDiscount = false;
  // //        var discAmtCalc = parseFloat(total) * parseFloat(state.discountAmt)/100;
  //         dispatch({
  //           type: "cartTotal",
  //           subTotal: formatter.format(total),
  //           cartItems: cartProducts,
  //           discount: applyDiscount,
  //           discountTotal: 0
  //         });
  //       }
  //       if(state.loggedIn) {
  //         var salesTaxCalc;
  //         var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
  //         salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
  //         dispatch({
  //           type: "salesTaxAmt",
  //           discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
  //           salesTaxAmt: formatter.format(salesTaxCalc)
  //         })   
  //       }
  //       else {
  //         salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
  //         console.log("sales tax = " + salesTaxCalc);
  //         dispatch({
  //           type: "salesTaxAmt",
  //           discountTotal: 0,
  //           salesTaxAmt: formatter.format(salesTaxCalc)
  //         })   
  //       }
  //     })
  //     .catch(err => console.log(err))
  //   }
  
    // function updateCartTotal() {
    //   var cartProducts = [];
    //   cart.forEach(element => {
    //     total = total + (element.prodInfo.price * element.prodInfo.quantity);
    //     cartProducts = [...cart];
    //   })
    //   if(state.loggedIn) {
    //     applyDiscount = true;
    //     var discAmtCalc = (parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt/100)))
    //       dispatch({
    //         type: "cartTotal",
    //         subTotal: formatter.format(total),
    //         cartItems: cartProducts,
    //         discount: applyDiscount,
    //         discountTotal: formatter.format(parseFloat(discAmtCalc) * parseFloat(state.discountAmt)/100)
    //       });
    //     }
    //   else {
    //     applyDiscount = false;
    //     dispatch({
    //       type: "cartTotal",
    //       subTotal: formatter.format(total),
    //        cartItems: cartProducts,
    //        discount: applyDiscount,
    //        discountTotal: 0
    //     });
    //   }
    //   if(state.loggedIn) {
    //     var salesTaxCalc;
    //     var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
    //     salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
    //     dispatch({
    //       type: "salesTaxAmt",
    //       discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
    //       salesTaxAmt: formatter.format(salesTaxCalc)
    //     })   
    //   }
    //   else {
    //     salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
    //     dispatch({
    //       type: "salesTaxAmt",
    //       discountTotal: 0,
    //       salesTaxAmt: formatter.format(salesTaxCalc)
    //     })   
    //   }
    // }
  
    // function quantityUpdate(newQuantity, index) {
    //   const newArray = [...cart];
    //   newArray[index].prodInfo.quantity = newQuantity;
    //   setCart(newArray);
    //   updateCartTotal();
    // }
  
    // function handleDecBtnClick(e) {
    //   var index;
    //   for (var i=0; i<cart.length; i++) {
    //     if ( cart[i]._id === e.target.id ) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   var newQuantity = cart[index].prodInfo.quantity - 1; 
    //   if(newQuantity <= 0) {
    //     newQuantity = 0;
    //   }
  
    //   quantityUpdate(newQuantity, index);
  
    //   API.updateCart(cart[index]._id, cart[index])
    //   .then(res=> {
    //     console.log(res.data);
    //   })
    // }
  
    // function handleIncBtnClick(e) {
    //   var index; 
    //   for (var i=0; i<cart.length; i++) {
    //     if ( cart[i]._id === e.target.id ) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   var newQuantity = cart[index].prodInfo.quantity + 1;
    //   quantityUpdate(newQuantity, index);
  
    //   API.updateCart(cart[index]._id, cart[index])
    //   .then(res=> {
    //     console.log(res.data);
    //   })
    // }
  
    // function handleRemoveClick (e) {
  
    //   API.deleteCartItem(e.target.id)
    //     .then(res => {
    //       console.log(res.data);
    //       getCart();
    //     })
    //     .catch(err => console.log(err));
    // }
  
    return (
      <div>
        <Container fluid>
          <Container>
          <Cart />
            <div className="container-fluid containerColor marginBottomCont">
              <h1 className="text-center">Order History</h1>
              {orders.length ? (
                <div>
                    <table className="table table-curved table-responsive">
                      <thead>
                        <tr>
                          <th className="alignCenter">Order ID</th>
                          <th className="alignCenter"></th>
                          <th className="alignCenter"></th>
                          <th className="alignCenter"></th>
                          <th className="alignCenter">Order Total</th>
                        </tr>
                      </thead>
                      <tbody >
                        {orders.map(result => (
                          <tr key={result._id}>
                            <td><p>{result._id}</p></td>
                            <td>     </td>
                            <td>     </td>
                            <td>     </td>
                            <td className="align-middle text-center"><p>{formatter.format(result.orderTotal)}</p></td>
                          </tr>
                          
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="row text-center h-100">
                    <div className="col-md-12 text-center my-auto">
                      <h3><strong>No Order History for this Shopper.</strong></h3>
                    </div>
                  </div>
                )}
            </div>
          </Container>
        </Container>
      </div>
    );

}

export default OrderHistory;