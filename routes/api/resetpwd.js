const router = require("express").Router();
const resetPwdController = require("../../controllers/resetPwdController");

// Matches with "/api/resetPwd/:email"

router
  .route("/:email")
  .post(resetPwdController.findOne)
  .put(resetPwdController.update);

module.exports = router;