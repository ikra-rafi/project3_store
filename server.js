const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./models");
const mongoose = require("mongoose");
// const MongoStore = require('connect-mongo')(session);
const passport = require("./passport");

// require('dotenv').config();
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static("client/public"));
}
//        store: new MongoStore({mongooseConnection: dbConnection}),
app.use(session ({
        secret: 'fraggle rock',
        resave: false,
        saveUnitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/spiceaholic',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

console.log(process.env.REACT_APP_API_KEY)
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
