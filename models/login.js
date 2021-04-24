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
  firstName: { type: String},
  lastName: { type: String},
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
//    console.log("plain text = " + plainTextPassword);
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

loginSchema.pre('save', function(next) {
  console.log('in loginschema save');
  console.log(this.password)
  if(!this.password) {
    console.log("==========NO PASSWORD PROVIDED=======");
    next();
  } else if(this.isModified('password')) {
      console.log('hashPassword in pre save');
      console.log(this.password);
      this.password = this.hashPassword(this.password);
      console.log("hash = " + this.password);
      next();
  }
  else next();
})

loginSchema.pre('updateOne', { document: false, query: true }, function(next) {
  console.log('Updating');
  console.log(this.getUpdate().$set.password);
  var mypwd = this.getUpdate().$set.password;
  var myemail = this.getUpdate().$set.email;
  console.log(myemail);
  console.log("after variable set");
  console.log(mypwd);
  console.log("after print");

console.log("before print");
    console.log(mypwd);
    var trythis = bcrypt.hashSync(mypwd, 10);
    console.log("trythis = " + trythis);

//    this.setUpdate().$set.password = trythis;
//    this.setUpdate(  bcrypt.hashSync(this.getUpdate().$set.password, 10))
//    this.setUpdate(this.getUpdate().password);
    next();
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
