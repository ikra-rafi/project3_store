const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const ordersSchema = new Schema(
  [
    {
      orderNum: { type: String },
      shippingAddress: {
        companyName: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        address2: { type: String },
        street: { type: String },
        city: {type: String },
        state: {type: String },
        zip: { type: String }
      },
      email: { type: String },
      phone: { type: String },
      creditCard: {
        billingAddress: {
          companyName: { type: String },
          firstName: { type: String },
          lastName: { type: String },
          street: { type: String },
          address2: { type: String },
          city: { type: String },
          state: { type: String },
          zip: { type: String },
        },
        cardInfo: {
          cardNumber: { type: String,
                        required: true },
          cardType: { type: String,
                        required: true },
          securityCode: { type: String,
                        required: true },
          cardName: { type: String,
                        required: true },
          expirationDate: { type: Date,
                        required: true }
        }
      },
      spices: [
        {
          name: { type: String },
          size: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          productIDs: {
            type: Schema.Types.ObjectId,
            ref: "Products"
          }
        }
      ],
      notes: { type: String },
      orderTotal: { type: Number }
    }
  ]
);

ordersSchema.methods = {
  hashcardNumber: plainTextCardNumber => {
    return bcrypt.hashSync(plainTextCardNumber, 10)
  },
  hashsecurityCode: plainTextSecurityCode => {
    return bcrypt.hashSync(plainTextSecurityCode, 10)
  }
}

ordersSchema.pre('save', function(next) {
  if(!this.creditCard.cardInfo.cardNumber) {
    console.log("==========NO CARDNUMBER PROVIDED=======");
    next();
  } else {
      console.log('hashCardNumber in pre save');
      this.creditCard.cardInfo.cardNumber = this.hashcardNumber(this.creditCard.cardInfo.cardNumber);
      next();
  }
  if(!this.creditCard.cardInfo.securityCode) {
    console.log("==========NO SECURITY CODE PROVIDED========");
    next();
  } else {
    console.log("hashSecurityCode in pre save");
    this.creditCard.cardInfo.securityCode = this.hashsecurityCode(this.creditCard.cardInfo.securityCode);
    next();
  }
})

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;