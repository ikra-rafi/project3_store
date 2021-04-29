const router = require("express").Router();
const productRoutes = require("./products");
const commentRoutes = require("./comments");
const recipeRoutes = require("./recipes");
const orderRoutes = require("./orders");
const cartRoutes = require("./cart");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const signupRoutes = require("./signup");
const resetPwdRoutes = require("./resetpwd");
const envVarsRoutes = require("./envVars");

// Product routes

router.use("/products", productRoutes);
router.use("/comments", commentRoutes);
router.use("/recipes", recipeRoutes);
router.use("/orders", orderRoutes);
router.use("/cart", cartRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/signup", signupRoutes);
router.use("/resetpwd", resetPwdRoutes);
router.use("/envVarsRoutes", envVarsRoutes);

module.exports = router;
