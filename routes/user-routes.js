let db = require("../models");
let path = require("path");

module.exports = function(app) {
    // GET the Home page
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


    // GET all users for login
    app.get("/login", (req, res) => {
        db.User.findAll({}).then(data =>{
            res.json(data);
          });
    });


    // POST route for registering new user
    app.post("/register", (req, res) => {
        db.User.create(req.body).then(data => {
            res.json(data);
        });
    });
}