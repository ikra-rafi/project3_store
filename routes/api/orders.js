const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

// Matches with "/api/orders"
router.route("/")
  .get(ordersController.findAll)
  // .post(ordersController.create);

router
  .route("/acct")
  .post(ordersController.findOne);

// Matches with "/api/orders/:id"
router
  .route("/:id")
  .delete(ordersController.remove)
  .post(ordersController.create);

module.exports = router;