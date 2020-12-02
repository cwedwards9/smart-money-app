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


    //  GET route for landing page
    app.get("/user/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            res.render("landing", {user: user});
        });
    });


    // GET route for loans page
    app.get("/user/loans/:id", (req, res) => {
        db.User.findOne({
            where:{
                id: req.params.id
            }
        }).then(user => {
            res.render("loans", {user: user})
        });
    });


    // Route Matcher
    app.get("*", (req, res) => {
        res.send("Sorry we could not find the page you were looking for. :(");
    });
}