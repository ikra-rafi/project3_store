const router = require("express").Router();
const salestaxController = require("../../controllers/salestaxController");

// Matches with "/api/salestax"
router.route("/")
  .get(salestaxController.findOne)
  .post(salestaxController.create)
  .delete(salestaxController.remove);

// Matches with "/api/salestax/:id"
router
  .route("/:id")
  .delete(salestaxController.removeItem)
//  .put(salestaxController.update);

router
  .route("/:state")
  .post(salestaxController.findOne)
  .put(salestaxController.update);

module.exports = router;