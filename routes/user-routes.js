let db = require("../models");

module.exports = function(app) {
    // Home page
    app.get("/", (req, res) => {
        res.render("home");
    });

    // Login page
    app.get("/login", (req, res) => {
        db.User.findAll({}).then(data =>{
            console.log(data);
            res.render("login", {users: data});
          });
    });

    // Register page
    app.get("/register", (req, res) => {
        res.render("register");
    });

    // POST route for registering new user
    app.post("/register", (req, res) => {
        db.User.create(req.body).then(() => {
            res.redirect("/login");
        });
    });

}