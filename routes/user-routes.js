let db = require("../models");
let path = require("path");
let passport = require("../config/passport");
let isAuthenticated = require("../config/middleware/isAuthenticated"); 

module.exports = function(app) {
    // GET the Home page
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });


    // GET route for logging a user in if they have valid login credentials (using passport.authenticate middleware)
    app.post("/login", passport.authenticate("local"), (req, res) => {
        // Respond to ajax request with user id in order to redirect to their landing page
        res.json(req.user);
    });


    // POST route for registering new user
    app.post("/register", (req, res) => {
        db.User.create(req.body).then(data => {
            res.json(data);
        });
    });


    //  GET route for landing page
    app.get("/user/:id", isAuthenticated, (req, res) => {
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


    // PUT route for updating a budget for a user
    app.put("/budget", (req, res) => {
        db.User.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }
        ).then(data => {
            res.json(data);
        });
    });


    // Route Matcher
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/error.html"));
    });
}