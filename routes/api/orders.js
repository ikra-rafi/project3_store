const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

// Matches with "/api/orders"
router.route("/")
  .get(ordersController.findAll)

router
  .route("/acct")
  .post(ordersController.findOne);

// Matches with "/api/orders/:id"
router
  .route("/:id")
  .delete(ordersController.remove)
 // .post(ordersController.create);

router
  .route("/:id/:acct")
  .post(ordersController.create);

module.exports = router;