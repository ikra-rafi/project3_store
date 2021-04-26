import axios from "axios";

export default {

  //============PRODUCT ROUTES =================
  // Gets all products from database
  getProducts: function() {
    return axios
    .get("/api/products")
    .then(res => {
      const products = res.data;
      return products;
    });
  },

  getProductsFromStore: function() {
    return axios.get("/api/products");
  },

  // getProductDetails: function(id) {
  //   console.log(id);
  //   return axios
  //   .get("/api/products/" + id)
  //   .then(res => {
  //     const product = res.data;
  //     return product;
  //   });
  // },


  // Deletes the book with the given id
  deleteProduct: function(id) {
    console.log("API id = " + id);
    return axios.delete("/api/products/" + id);
  },

  // Saves the products to database
  saveProducts: function(storeProducts) {
    return axios.post("/api/products", storeProducts);
  },

  // Update a product in the database
  updateProduct: function(id) {
    return axios.post("/api/products/" + id);
  },

  //=============COMMENT ROUTES ===================
  // Gets all comments from database
  getComments: function() {
    return axios.get("/api/comments");
  },

   getCommentAcct: function(loginData) {
     console.log("in login acct");
     console.log("loginData = " + loginData.email, loginData._id)
     return axios.post("/api/comments/acct", loginData);
   },

  // Saves the comments to database
  saveComments: function(id, storeComments) {
    console.log("api id = " + id);
    console.log("storeComments = " + storeComments)
    return axios.post("/api/comments/" + id, storeComments);
  },

  // ==============ORDER ROUTES=====================
  // Gets all orders from database
  getOrders: function() {
    return axios.get("/api/orders");
  },

  // Get account info of logged in user
  getOrdersAcct: function(loginData) {
    console.log("in login acct");
    console.log("loginData = " + loginData.email, loginData._id)
    return axios.post("/api/orders/acct", loginData);
  },

  // Saves the orders to database
  saveOrders: function(id, acct, storeOrders) {
  return axios.post("/api/orders/" + id + "/acct" + acct, storeOrders);
 },

  // Updates an order
//  updateOrders: function(orderData) {
//    return axios.post("api/orders", orderData);
//  },

  //==============CART ROUTES====================
  // Gets all contents in cart from database
  getCart: function() {
    return axios.get("/api/cart");
  },

  // Saves cart to database
  saveCart: function(cartData) {
    return axios.post("/api/cart", cartData);
  },

  // Updates cart content in database
  updateCart: function(id, cartData) {
    return axios.put("/api/cart/" + id, cartData);
  },

  deleteCart: function(id) {
    console.log("API id = " + id);
    return axios.delete("/api/cart/" + id);
  },

  //==============RECIPE ROUTES ==================
  // Gets all recipes from database
  getRecipes: function() {
    return axios.get("/api/recipes");
  },

  // Saves recipes to database
  // saveRecipes: function(storeRecipes) {
  //   return axios.post("/api/recipes", storeRecipes);
  // },

  //==============LOGIN ROUTES===================

  // Gets a specific login based on id
  getLogin: function(loginData) {
    console.log("ingetlogin");
    console.log("/api/login/" + loginData.email, loginData.password);
    return axios.post("/api/login", loginData);
  },

  // getLoginAcct: function(loginData) {
  //   console.log("in login acct");
  //   return axios.post("/api/login/acct", loginData);
  // },

  // Saves login to database
  saveLogin: function(storeLogin) {
    console.log("saveLogin = " + storeLogin.securityQuestion)
    return axios.post("/api/signup", storeLogin);
  },

  // Updates login in database
  updateLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  },

  // Logout the user
  Logout: function() {
    console.log("inapi logout route");
    return axios.post("/api/logout");
  },

  //=================RESET PASSWORD ROUTES=================
  getAcctQuestionAnswer: function(loginData) {
    console.log("in reset pwd");
    console.log("/api/resetpwd/" + loginData.email);
    return axios.post("/api/resetpwd/" + loginData.email);
  },

  resetPassword: function(email, password) {
    console.log("in reset pwd");
    console.log("email = " + email + "  password = " + password);
    return axios.put("/api/resetpwd/" + email, password);
  },

  saveUpdate: function(id, storeLogin) {
    console.log("save reset password");
    console.log("update pwd = " + storeLogin);
    return axios.put("/api/resetpwd/" + id, storeLogin);
  },

//  saveUpdate: function(storeLogin) {
//    console.log("save reset password");
//    return axios.post("/api/recipes", storeLogin);
//  }

// //=================GET ENV VARS==================
// getEnvVars: function() {
//   console.log("in api getenvvars");
//   return axios.get("/api/envVars");
// }

};