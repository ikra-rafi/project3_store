const router = require("express").Router();
const shippingController = require("../../controllers/shippingController");

// Matches with "/api/shipping"
router.route("/")
  .get(shippingController.findAll)
  .post(shippingController.create)
  .delete(shippingController.remove);

// Matches with "/api/shipping/:id"
router
  .route("/:id")
  .delete(shippingController.removeItem)
  .put(shippingController.update);

  // Matches with "/api/shipping/:maxWeight"
router
  .route("/:maxWeight")
  .post(shippingController.findOne)

module.exports = router;