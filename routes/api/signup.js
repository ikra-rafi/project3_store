const router = require("express").Router();
const loginController = require("../../controllers/signupController");

// Matches with "/api/login"
  router.route("/")
     .post(loginController.create);

module.exports = router;