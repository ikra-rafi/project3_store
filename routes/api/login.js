const router = require("express").Router();
const loginController = require("../../controllers/loginController");

// Matches with "/api/login"
router.route("/")
  .get(loginController.findAll)
  .post(loginController.create);

// Matches with "/api/login/:id"
router
  .route("/:id")
  .delete(loginController.remove)
  .put(loginController.update);

module.exports = router;