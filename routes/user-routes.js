const db = require("../models");
const user = require("../models/user");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render("home");
    });
}