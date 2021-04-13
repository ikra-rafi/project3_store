const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: { type: String},
  password: { type: String},
  securityQuestion: { type: String},
  securityAnswer: {type: String},
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
