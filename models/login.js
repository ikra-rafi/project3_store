const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: { type: String},
  password: { type: String},
  securityQuestion: { type: String},
  securityAnswer: {type: String},
  admin: { type: Boolean},
  discount: { type: Number },
  commentIDs: [{
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }],
  orderIDs: [{
    type: Schema.Types.ObjectId,
    ref: "Orders"
  }]
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
