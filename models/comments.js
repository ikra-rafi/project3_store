const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema([
  {
    userComment: { type: String },
    productID: { type: String },
    title: {type: String}
  }
]);

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
