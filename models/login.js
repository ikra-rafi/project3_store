const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const loginSchema = new Schema([
  {
  email: { type: String,
          required: false},
  password: { type: String,
          required: false},
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

}]
);

loginSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

loginSchema.pre('save', function(next) {
  console.log('in loginschema save');
  if(!this.password) {
    console.log("==========NO PASSWORD PROVIDED=======");
    next();
  } else {
      console.log('hashPassword in pre save');
      this.password = this.hashPassword(this.password);
      next();
  }
})

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
