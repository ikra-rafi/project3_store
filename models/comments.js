const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({

  userComments: {
    userComment: { type: String },
    productID: { type: String }
  }
})

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
