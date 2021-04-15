const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes"
router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/recipes/:id"
router
  .route("/:id")
  .delete(recipesController.remove)
  .put(recipesController.update);

module.exports = router;