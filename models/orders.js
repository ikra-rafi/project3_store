const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
          cardNumber: { type: String },
          cardType: { type: String },
          securityCode: { type: String },
          cardName: { type: String },
          expirationDate: { type: Date }
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

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
