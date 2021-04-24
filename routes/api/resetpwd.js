const router = require("express").Router();
const resetPwdController = require("../../controllers/resetPwdController");
const loginController = require("../../controllers/loginController");
//const passport = require("../../passport");
console.log("in reset password router");


// Matches with "/api/login"
/* router.route("/")
//     .get(loginController.findAll)
     .post(resetPwdController.create); */

// Matches with "/api/resetPwd/:email"

router
  .route("/:email")
  .post(resetPwdController.findOne)
  .put(resetPwdController.update);

module.exports = router;