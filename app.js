const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}` );
});