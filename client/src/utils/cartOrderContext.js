import React from "react";
console.log("cart_order context");

// context for cart/order to be passed between components
const CartOrderContext = React.createContext({
  cart1: [],
  orderTotal: 0,
});

export default CartOrderContext;