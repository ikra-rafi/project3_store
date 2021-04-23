import axios from "axios";

export default {

  //============PRODUCT ROUTES =================
  // Gets all products from database
  getProducts: function() {
    return axios.get("/api/products");
  },

<<<<<<< HEAD
  // Deletes the product with the given id
=======
  // Deletes the book with the given id
>>>>>>> parent of f1062d7... Updates to Products pages
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
<<<<<<< HEAD

  // Saves the comments to database
=======
  
>>>>>>> parent of f1062d7... Updates to Products pages
  saveComments: function(storeComments) {
    return axios.post("/api/comments", storeComments);
  },

  // ==============ORDER ROUTES=====================
  // Gets all orders from database
  getOrders: function() {
    return axios.get("/api/orders");
  },

  // Saves the orders to database
  saveOrders: function(orderInfo) {
    return axios.post("/api/orders", orderInfo);
  },
<<<<<<< HEAD

  // Updates an order
=======
  
>>>>>>> parent of f1062d7... Updates to Products pages
  updateOrders: function(orderData) {
    return axios.post("api/orders", orderData);
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
  saveRecipes: function(storeRecipes) {
    return axios.post("/api/recipes", storeRecipes);
  },

  //==============LOGIN ROUTES===================

  // Gets a specific login based on id
  getLogin: function(loginData) {
    console.log("ingetlogin");
    console.log("/api/login/" + loginData.email, loginData.password);
    return axios.post("/api/login", loginData);
  },

  // Saves login to database
  saveLogin: function(storeLogin) {
    console.log(storeLogin)
    return axios.post("/api/signup", storeLogin);
  },

  // Updates login in database
  updateLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  },

  Logout: function() {
    console.log("inapi logout route");
    return axios.post("/api/logout");
  }

};