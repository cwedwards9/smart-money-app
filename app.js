const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use public directory
app.use(express.static("public"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import Routes
require("./routes/user-routes")(app);


app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}` );
});