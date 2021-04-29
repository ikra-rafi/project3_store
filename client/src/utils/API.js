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

  // Deletes the book with the given id
  deleteProduct: function(id) {
    return axios.delete("/api/products/" + id);
  },

  // Saves the products to database
  saveProducts: function(storeProducts) {
    return axios.post("/api/products", storeProducts);
  },

  // Update a product in the database
  updateProduct: function(id, data) {
    return axios.put("/api/products/" + id, data);
  },

  //=============COMMENT ROUTES ===================
  // Gets all comments from database
  getComments: function() {
    return axios.get("/api/comments");
  },

   getCommentAcct: function(loginData) {
     return axios.post("/api/comments/acct", loginData);
   },

  // Saves the comments to database
  saveComments: function(id, storeComments) {
    return axios.post("/api/comments/" + id, storeComments);
  },

  // ==============ORDER ROUTES=====================
  // Gets all orders from database
  getOrders: function() {
    return axios.get("/api/orders");
  },

  // Get account info of logged in user
  getOrdersAcct: function(loginData) {
    return axios.post("/api/orders/acct", loginData);
  },

  // Saves the orders to database
  saveOrders: function(id, acct, storeOrders) {
  return axios.post("/api/orders/" + id + "/acct" + acct, storeOrders);
 },

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

  // Delete an item from shopping cart in database
  deleteCartItem: function(id) {
    return axios.delete("/api/cart/" + id);
  },

  // Delete all items in shopping cart
  deleteCart: function() {
    return axios.delete("/api/cart");
  },

  //==============RECIPE ROUTES ==================
  // Gets all recipes from database
  getRecipes: function() {
    return axios.get("/api/recipes");
  },

  //==============LOGIN ROUTES===================

  // Gets a specific login based on id
  getLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  },

  // Saves login to database
  saveLogin: function(storeLogin) {
    return axios.post("/api/signup", storeLogin);
  },

  // Updates login in database
  updateLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  },

  // Logout the user
  Logout: function() {
    return axios.post("/api/logout");
  },

  //=================RESET PASSWORD ROUTES=================
  getAcctQuestionAnswer: function(loginData) {
    return axios.post("/api/resetpwd/" + loginData.email);
  },

  resetPassword: function(email, password) {
    return axios.put("/api/resetpwd/" + email, password);
  },

  saveUpdate: function(id, storeLogin) {
    return axios.put("/api/resetpwd/" + id, storeLogin);
  },

// //=================GET ENV VARS==================
// getEnvVars: function() {
//   console.log("in api getenvvars");
//   return axios.get("/api/envVars");
// }

};