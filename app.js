const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("./config/passport");
const flash = require("connect-flash");

const PORT = process.env.PORT || 8080;

const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use public directory
app.use(express.static("public"));

// Use sessions in order to use persistent login sessions
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import Routes
require("./routes/transaction-routes")(app);
require("./routes/bill-routes")(app);
require("./routes/user-routes")(app);

// Synchronize the models with the database and then start the server
db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}` );
    });
});