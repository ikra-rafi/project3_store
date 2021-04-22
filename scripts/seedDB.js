const mongoose = require("mongoose");
const db = require("../models");
// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/spiceaholic"
);

const productSeed = [
  { name: "vanilla",
    description: "vanilla, yum!",
    packaging: [
        { size: "4oz bottle",
          price: "5.99",
          quantity: 5
        },
        { size: "16 oz flatpack",
          price: "9.99",
          quantity: 10
        }],
    healthbenefit: "www.cnn.com",
    picLink: "./images/vanilla.jpg",
    historyDetails: "Vanilla hails from 5 regions of the world",
    family: {
        baking: true,
        grilling: false,
        seasoning: false,
        extract: true,
        teas: false
    },
    region: {
        india: false,
        asia: true,
        carribean: false,
        middleEast: false,
        african: false,
        latinAmerica: false,
        europe: false
    },
    productID: "Van0001",
    ratings: [{ stars: 2}, {stars: 2}, {stars: 3}, {stars: 5}]
  },
  { name: "cinnamon",
    description: "sweet taste ground bark for baking",
    packaging: [
        { size: "4oz bottle",
          price: "5.99",
          quantity: 5
        },
        { size: "16 oz flatpack",
          price: "9.99",
          quantity: 10
        }],
    healthbenefit: "www.cnn.com",
    picLink: "./images/cinnamon.jpg",
    historyDetails: "Cinnamon hails from 5 regions of the world",
    family: {
        baking: true,
        grilling: false,
        seasoning: false,
        extract: false,
        teas: false
    },
    region: {
        india: false,
        asia: true,
        carribean: false,
        middleEast: false,
        african: false,
        latinAmerica: false,
        europe: false
    },
    productID: "Cinn0001",
    ratings: [{ stars: 4}, {stars: 5}, {stars: 3}, {stars: 4}]
  },
  { name: "paprika",
    description: "sweet red pepper dried and ground",
    packaging: [
        { size: "4oz bottle",
          price: "3.99",
          quantity: 2
        },
        { size: "16 oz flatpack",
          price: "5.99",
          quantity: 3
        }],
    healthbenefit: "www.bbc.com",
    picLink: "./images/paprika.jpg",
    historyDetails: "Paprika comes from 2 regions - Hungary or Spain.   It comes in sweet, hot & smoked.",
    family: {
        baking: false,
        grilling: true,
        seasoning: true,
        extract: false,
        teas: false
    },
    region: {
        india: false,
        asia: false,
        carribean: false,
        middleEast: false,
        african: false,
        latinAmerica: false,
        europe: true
    },
    productID: "Paprika0025",
    ratings: [{ stars: 2}, {stars: 2}, {stars: 5}, {stars: 3}]
  },
  { name: "chili powder",
    description: "the core of Tex-Mex cooking.",
    packaging: [
        { size: "4oz bottle",
          price: "3.99",
          quantity: 5
        },
        { size: "16 oz flatpack",
          price: "9.99",
          quantity: 10
        }],
    healthbenefit: "www.cnn.com",
    picLink: "./images/chili-powder.jpg",
    historyDetails: "Chili powder...",
    family: {
        baking: false,
        grilling: false,
        seasoning: false,
        extract: false,
        teas: false
    },
    region: {
        india: false,
        asia: true,
        carribean: false,
        middleEast: false,
        african: false,
        latinAmerica: false,
        europe: false
    },
    productID: "Chili0001",
    ratings: [{ stars: 4}, {stars: 5}, {stars: 3}, {stars: 4}]
  }
]

db.Products
  .remove({})
  .then(() => db.Products.collection.insertMany(productSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  const orderSeed = [
    { orderNum: "AA0013",
      shippingAddress: {
          name: "Ashley Stith",
          street: "221 Baker Street",
          city: "London",
          state: "CT",
          zip: "03821"
      },
      email: "ashley@gmail.com",
      phone: "555-222-1111",
      creditCard: {
          billingAddress: {
              name: "Ashley Stith",
              street: "221 Baker Street",
              city: "London",
              state: "CT",
              zip: "03821"
          },
          cardInfo: {
              cardNumber: "1111222233334444",
              cardType: "Visa",
              cardName: "Ashley Stith",
              securityCode: "735",
              expirationDate: "07/31/2023"
          }
      },
      spices: [
        {
            name: "turmeric",
            size: "4oz bottle",
            price: "5.99",
            quantity: 1,
        },
        {
            name: "peppermint extract",
            size: "8oz bottle",
            price: "3.99",
            quantity: 1,
        }
      ],
      orderTotal: 9.99
    },
    { orderNum: "AA0013",
      shippingAddress: {
          name: "John Toth",
          street: "125 Morning Mist Lane",
          city: "Frederick",
          state: "MD",
          zip: "21702"
      },
      email: "john@gmail.com",
      phone: "555-332-8789",
      creditCard: {
          billingAddress: {
              name: "John Toth",
              street: "125 Morning Mist Lane",
              city: "Frederick",
              state: "MD",
              zip: "21702"
          },
          cardInfo: {
              cardNumber: "8888222277773333",
              cardType: "MasterCard",
              cardName: "John Toth",
              securityCode: "194",
              expirationDate: "12/31/2026"
          }
      },
      spices: [
        {
            name: "garlic",
            size: "4oz bottle",
            price: "4.99",
            quantity: 2,
        },
        {
            name: "Steakmate seasoning",
            size: "4oz bottle",
            price: "4.99",
            quantity: 1,
        }
      ],
      orderTotal: 14.97
    },
]

db.Orders
  .remove({})
  .then(() => db.Orders.collection.insertMany(orderSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  const shoppingCartSeed = [
    { name: "salt",
          productID: "SA0003",
          prodInfo: {
            size: "4oz bottle",
            price: "4.99",
            quantity: 1
          }
        },
        {
          name: "ground ginger",
          productID: "GIN0002",
          prodInfo: {
            size: "16oz package",
            price: "12.99",
            quantity: 1
          }
        },
        {
          name: "chamomile tea",
          productID: "CHAM0015",
          prodInfo: {
            size: "4oz package",
            price: "5.99",
            quantity: 2
          }
        }
  ]

db.ShoppingCart
  .remove({})
  .then(() => db.ShoppingCart.collection.insertMany(shoppingCartSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

