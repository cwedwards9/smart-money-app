const db = require("../models");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render("home");
    });

    app.get("/users", (req, res) => {
        db.User.findAll({}).then(function(data) {
            console.log(data);
            // res.render("users", {users: data});
          });
    });
}