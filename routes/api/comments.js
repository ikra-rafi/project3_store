const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");

// Matches with "/api/comments"
router.route("/")
  .get(commentsController.findAll)

// Matches with "/api/comments/acct"
router.route("/acct")
  .post(commentsController.findOne)

// Matches with "/api/comments/:id"
router
  .route("/:id")
  .delete(commentsController.remove)
  .post(commentsController.create);

module.exports = router;