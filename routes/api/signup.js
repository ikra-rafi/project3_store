const router = require("express").Router();
const loginController = require("../../controllers/signupController");
console.log("in loginrouter");

// Matches with "/api/login"
  router.route("/")
//     .get(loginController.findAll)
     .post(loginController.create);

module.exports = router;