const router = require("express").Router();
const envVarsController = require("../../controllers/envVarsController");

// // Matches with "/api/envVars"
 router.route("/")
   .get(envVarsController.getenvVars)

module.exports = router;