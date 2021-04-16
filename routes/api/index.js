const router = require("express").Router();
const productRoutes = require("./products");
const commentRoutes = require("./comments");
const recipeRoutes = require("./recipes");
const orderRoutes = require("./orders");
const cartRoutes = require("./cart");
const loginRoutes = require("./login");

// Product routes
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);
router.use("/recipes", recipeRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/login", loginRoutes);

module.exports = router;
