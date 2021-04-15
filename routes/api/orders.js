const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

// Matches with "/api/orders"
router.route("/")
  .get(ordersController.findAll)
  .post(ordersController.create);

// Matches with "/api/orders/:id"
router
  .route("/:id")
  .delete(ordersController.remove)
  .put(ordersController.update);

module.exports = router;