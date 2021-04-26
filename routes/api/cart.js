const router = require("express").Router();
const cartController = require("../../controllers/cartController");
//const db = require("../../models");

// Matches with "/api/cart"
router.route("/")
  .get(cartController.findAll)
  .post(cartController.create)
  .delete(cartController.remove);

// Matches with "/api/cart/:id"
router
  .route("/:id")
  .delete(cartController.removeItem)
  .put(cartController.update);

module.exports = router;