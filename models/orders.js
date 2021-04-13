const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  [
    {
      orderNum: { type: String },
      shippingAddress: {
        name: { type: String },
        street: { type: String },
        city: {type: String },
        state: {type: String },
        zip: { type: String }
      },
      email: { type: String },
      phone: { type: String },
      creditCard: {
        billingAddress: {
          name: { type: String },
          street: { type: String },
          city: { type: String },
          state: { type: String },
          zip: { type: String },
        },
        cardInfo: {
          cardNumber: { type: String },
          cardType: { type: String },
          securityCode: { type: String },
          cardName: { type: String },
          expirationDate: { type: Date }
        }
      },
      spice: [
        {
          name: { type: String },
          size: { type: String },
          price: { type: Number },
          quantity: { type: Number }
        }
      ]
    }
  ]
);

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
