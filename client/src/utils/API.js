import axios from "axios";

export default {

  // Gets all products from database
  getProducts: function() {
    return axios.get("/api/products");
  },

  // Deletes the book with the given id
  deleteProduct: function(id) {
    console.log("API id = " + id);
    return axios.delete("/api/products/" + id);
  },

  saveProducts: function(storeProducts) {
    return axios.post("/api/products", storeProducts);
  },
  
  // Update a product in the database
  updateProduct: function(productData) {
    return axios.post("/api/products", productData);
  },

  getComments: function() {
    return axios.get("/api/comments");
  },
  
  saveComments: function(storeComments) {
    return axios.post("/api/comments", storeComments);
  },

  getOrders: function() {
    return axios.get("/api/orders");
  },

  saveOrders: function(orderInfo) {
    return axios.post("/api/orders", orderInfo);
  },
  
  updateOrders: function(orderData) {
    return axios.post("api/orders", orderData);
  },

  getCart: function() {
    return axios.get("/api/cart");
  },

  saveCart: function(cartData) {
    return axios.post("/api/cart", cartData);
  },

  updateCart: function(cartData) {
    return axios.post("/api/cart", cartData);
  },

  getRecipes: function() {
    return axios.get("/api/recipes");
  },

  saveRecipes: function(storeRecipes) {
    return axios.post("/api/recipes", storeRecipes);
  },

  getLogin: function() {
    return axios.get("/api/login");
  },

  saveLogin: function(storeLogin) {
    return axios.post("/api/login", storeLogin)
  },

  updateLogin: function(loginData) {
    return axios.post("/api/login", loginData);
  }

};
