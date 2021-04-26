import React , { useEffect, useState} from "react";
import { useTodoContext} from "../utils/store";
import API from "../utils/API";
import { Link, useLocation } from "react-router-dom";
import AdminTable from "../components/AdminTable";

function Admin() {

  const [product, setProducts]= useState([]);
  const [state, dispatch] = useTodoContext();

  // console.log(state);

  useEffect(() => {
    console.log("product Effect");
    getProducts();
    // if(state.loggedIn) {
    //   // applyDiscount = true;
    // }
    // else {
    //   // applyDiscount = false;
    // }
  }, [])

  function getProducts() {
    API.getProductsFromStore()
    .then(res=> {
      setProducts(res.data);
      var products = [];
      res.data.forEach(element => {
        products.push(element);

      });
      console.log(products);

      dispatch({
        type: "products",
        products: products
      });
      // if(state.loggedIn) {
      //   applyDiscount = true;
      //   var discAmtCalc = ((parseFloat(total) - (parseFloat(total) * parseFloat(state.discountAmt)/100)))
      //   dispatch({
      //     type: "cartTotal",
      //     subTotal: formatter.format(total),
      //     cartItems: cartProducts,
      //     discount: applyDiscount,
      //     discountTotal: formatter.format(parseFloat(total) * parseFloat(state.discountAmt)/100)
      //   });
      // }
      // else {
      //   applyDiscount = false;
      //   var discAmtCalc = parseFloat(total) * parseFloat(state.discountAmt)/100;
      //   dispatch({
      //     type: "cartTotal",
      //     subTotal: formatter.format(total),
      //     cartItems: cartProducts,
      //     discount: applyDiscount,
      //     discountTotal: 0
      //   });
      // }
      // if(state.loggedIn) {
      //   var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
      //   var salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
      //   dispatch({
      //     type: "salesTaxAmt",
      //     discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
      //     salesTaxAmt: formatter.format(salesTaxCalc)
      //   })
      // }
      // else {
      //   var salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
      //   console.log("sales tax = " + salesTaxCalc);
      //   dispatch({
      //     type: "salesTaxAmt",
      //     discountTotal: 0,
      //     salesTaxAmt: formatter.format(salesTaxCalc)
      //   })
      // }
    })
    .catch(err => console.log(err))
  }

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
  //     var mydiscount = parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100);
  //     var salesTaxCalc = ((parseFloat(total) - parseFloat(mydiscount)) * (parseFloat(state.salesTax)/100));
  //     dispatch({
  //       type: "salesTaxAmt",
  //       discountTotal: parseFloat(parseFloat(total) * parseFloat(state.discountAmt)/100),
  //       salesTaxAmt: formatter.format(salesTaxCalc)
  //     })
  //   }
  //   else {
  //     var salesTaxCalc = (parseFloat(total)) * parseFloat(state.salesTax)/100;
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

  //   API.deleteCart(e.target.id)
  //     .then(res => {
  //       console.log(res.data);
  //       getCart();
  //     })
  //     .catch(err => console.log(err));
  // }

  return (


        <AdminTable />



  );
}

export default Admin;