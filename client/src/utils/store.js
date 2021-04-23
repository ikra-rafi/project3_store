import React, { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();
  const { Provider } = TodoContext;
  
  function reducer(state, action) {
    switch (action.type) {
    case "cartTotal":
           return (
               {
                   orderTotal: action.orderTotal,
                   salesTax: state.salesTax,
                   salesTaxAmt: action.salesTaxAmt,
                   shipFee: state.shipFee,
                   subTotal: action.subTotal,
                   cartItems: state.cartItems= action.cartItems,
                   discount: action.discount,
                   discountAmt: action.discountAmt
               }
           )
    default:
      return state;
    }
  }
  
  function TodoProvider({...props }) {
    const [state, dispatch] = useReducer(reducer, {
        cartItems: [],
        orderTotal: 0,
        shipFee: 8,
        salesTax: 6,
        salesTaxAmt: 0,
        subTotal: 0,
        discount: false,
        discountAmt: 10
      });
  
    return <Provider value={[state, dispatch]} {...props} />;
  }
  
  function useTodoContext() {
    return useContext(TodoContext);
  }
  
  export { TodoProvider, useTodoContext };