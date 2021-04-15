const router = require("express").Router();
const cartController = require("../../controllers/cartController");

// Matches with "/api/cart"
router.route("/")
  .get(cartController.findAll)
  .post(cartController.create);

// Matches with "/api/cart/:id"
router
  .route("/:id")
  .delete(cartController.remove)
  .put(cartController.update);

module.exports = router;