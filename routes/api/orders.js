const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

// Matches with "/api/orders"
router.route("/")
  .get(ordersController.findAll)

// Matches with "/api/orders/acct"
router
  .route("/acct")
  .post(ordersController.findOne);

// Matches with "/api/orders/:id"
router
  .route("/:id")
  .delete(ordersController.remove)

// Matches with /api/orders/:id/:acct
router
  .route("/:id/:acct")
  .post(ordersController.create);

module.exports = router;