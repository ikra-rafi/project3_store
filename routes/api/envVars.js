const router = require("express").Router();
const envVarsController = require("../../controllers/envVarsController");

// // Matches with "/api/comments"
 router.route("/")
   .get(envVarsController.getenvVars)

module.exports = router;