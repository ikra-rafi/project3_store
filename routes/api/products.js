const router = require("express").Router();
const productsController = require("../../controllers/productsController");
const ordersController = require("../../controllers/ordersController");
const recipesController = require("../../controllers/recipesController");
const cartController = require("../../controllers/cartController");
const loginController = require("../../controllers/loginController");
// const commentsController = require("../../controllers/commentsController");

// Matches with "/api/products"
router.route("/")
  .get(productsController.findAll)
  .post(productsController.create)
  .get(ordersController.findAll)
  .post(ordersController.create)
  .get(recipesController.findAll)
  .post(recipesController.create)
  .get(cartController.findAll)
  .post(cartController.create)
  .get(loginController.findAll)
  .post(loginController.create)
  // .get(commentsController.findAll)
  // .post(commentsController.create);


// Matches with "/api/products/:id"
router
  .route("/:id")
  .delete(productsController.remove)
  .put(productsController.update);

module.exports = router;
