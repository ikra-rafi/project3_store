const router = require("express").Router();
const productsController = require("../../controllers/productsController");
const ordersController = require("../../controllers/ordersController");
const recipesController = require("../../controllers/recipesController");
// const cartController = require("../../controllers/cartController");

// Matches with "/api/products"
router.route("/")
  .get(productsController.findAll)
  .post(productsController.create)
  .get(ordersController.findAll)
  .post(ordersController.create)
  .get(recipesController.findAll)
  .post(recipesController.create)
  // .get(cartController.findAll)
  // .post(cartController.create)

// Matches with "/api/products/:id"
router
  .route("/:id")
  // .get(loginController.findOne)
  .delete(productsController.remove)
  .put(productsController.update);

module.exports = router;
