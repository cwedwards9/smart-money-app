let express = require("express");
let app = express();

const PORT = process.env.PORT || 8080;

let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use public directory
app.use(express.static("public"));

// Set Handlebars
let exphbs = require("express-handlebars");

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