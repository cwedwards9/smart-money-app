const db = require("../models");
const path = require("path");
const passport = require("../config/passport");
const isLoggedIn = require("../config/middleware/isLoggedIn");
const isOwner = require("../config/middleware/isOwner");


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
        db.User.create(req.body).then(registeredUser => {
            // Respond with the user id in order to redirect to their landing page
            req.login(registeredUser, err => {
                if(err) return next(err);
                res.redirect(`/user/${registeredUser.dataValues.id}`);
            });
        });
    });


    // GET route for loggin a user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });


    //  GET route for landing page
    app.get("/user/:id", isLoggedIn, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            res.render("landing", {user: user});
        });
    });


    // GET route for loans page
    app.get("/user/loans/:id", isLoggedIn, (req, res) => {
        db.User.findOne({
            where:{
                id: req.params.id
            }
        }).then(user => {
            res.render("loans", {user: user})
        });
    });


    // PUT route for updating a budget for a user
    app.put("/budget", isLoggedIn, (req, res) => {
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