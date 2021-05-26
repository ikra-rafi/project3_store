import React, { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();
  const { Provider } = TodoContext;

  function reducer(state, action) {
    switch (action.type) {
      case "products":
        return (
          {
            orderTotal: state.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: state.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: action.subTotal,
            cartItems: state.cartItems = action.cartItems,
            discount: action.discount,
            discountAmt: state.discountAmt,
            discountTotal: action.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email,
            products: state.products = action.products,
            admin: state.admin,
            numItems: state.numItems
          }
        )
      case "cartTotal":
        return (
          {
            orderTotal: state.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: state.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: action.subTotal,
            cartItems: state.cartItems = action.cartItems,
            discount: action.discount,
            discountAmt: state.discountAmt,
            discountTotal: action.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email,
            products: state.products = action.products,
            admin: state.admin,
            numItems: state.numItems
          }
        )
      case "salesTaxAmt":
        return (
          {
            orderTotal: state.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: action.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: state.subTotal,
            cartItems: state.cartItems,
            discount: state.discount,
            discountAmt: state.discountAmt,
            discountTotal: action.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email,
            products: state.products,
            admin: state.admin,
            numItems: state.numItems
          }
        )
      case "orderTotal":
        return (
          {
            orderTotal: action.orderTotal,
            salesTax: state.salesTax,
            salesTaxAmt: state.salesTaxAmt,
            shipFee: state.shipFee,
            subTotal: state.subTotal,
            cartItems: state.cartItems,
            discount: state.discount,
            discountAmt: state.discountAmt,
            discountTotal: state.discountTotal,
            loggedIn: state.loggedIn,
            email: state.email,
            products: state.products,
            admin: state.admin,
            numItems: state.numItems
          }
        )
    case "loggedIn":
      return (
        {
          orderTotal: state.orderTotal,
          salesTax: state.salesTax,
          salesTaxAmt: state.salesTaxAmt,
          shipFee: state.shipFee,
          subTotal: state.subTotal,
          cartItems: state.cartItems,
          discount: state.discount,
          discountAmt: state.discountAmt,
          discountTotal: state.discountTotal,
          loggedIn: action.loggedIn,
          email: action.email,
          products: state.products,
          admin: action.admin,
          numItems: state.numItems
        }
      )
    case "numCartItems":
    return (
      {
        orderTotal: state.orderTotal,
        salesTax: state.salesTax,
        salesTaxAmt: state.salesTaxAmt,
        shipFee: state.shipFee,
        subTotal: state.subTotal,
        cartItems: state.cartItems,
        discount: state.discount,
        discountAmt: state.discountAmt,
        discountTotal: state.discountTotal,
        loggedIn: state.loggedIn,
        email: state.email,
        products: state.products,
        admin: state.admin,
        numItems: action.numItems
      }
    )
    case "salesTaxRate":
    return (
      {
        orderTotal: state.orderTotal,
        salesTax: action.salesTax,
        salesTaxAmt: state.salesTaxAmt,
        shipFee: state.shipFee,
        subTotal: state.subTotal,
        cartItems: state.cartItems,
        discount: state.discount,
        discountAmt: state.discountAmt,
        discountTotal: state.discountTotal,
        loggedIn: state.loggedIn,
        email: state.email,
        products: state.products,
        admin: state.admin,
        numItems: state.numItems
      }
    )
    case "shipCost":
    return (
      {
        orderTotal: state.orderTotal,
        salesTax: state.salesTax,
        salesTaxAmt: state.salesTaxAmt,
        shipFee: action.shipFee,
        subTotal: state.subTotal,
        cartItems: state.cartItems,
        discount: state.discount,
        discountAmt: state.discountAmt,
        discountTotal: state.discountTotal,
        loggedIn: state.loggedIn,
        email: state.email,
        products: state.products,
        admin: state.admin,
        numItems: state.numItems
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
        shipFee: 0,
        salesTax: 0,
        salesTaxAmt: 0,
        subTotal: 0,
        discount: false,
        discountTotal: 0,
        discountAmt: 10,
        loggedIn: false,
        email: "",
        admin: "",
        products: [],
        numItems: 0,
      });

    return <Provider value={[state, dispatch]} {...props} />;
  }

  function useTodoContext() {
    return useContext(TodoContext);
  }

  export { TodoProvider, useTodoContext };