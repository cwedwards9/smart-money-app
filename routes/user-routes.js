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


    // GET route for the login page
    app.get("/login", (req, res) => {
        res.render("login");
    });

    // GET route for logging a user in if they have valid login credentials (using passport.authenticate middleware)
    app.post("/login", passport.authenticate("local", {failureFlash: "Invalid username or password", failureRedirect: "/login"}), (req, res) => {
        // Redirect user to their landing page
        req.flash("success", "Welcome back!");
        res.redirect(`/user/${req.user.id}`);
    });


    // GET route for the register page
    app.get("/register", (req, res) => {
        res.render("register");
    });

    // POST route for registering new user
    app.post("/register", (req, res) => {
        db.User.create(req.body).then(registeredUser => {
            // Respond with the user id in order to redirect to their landing page
            req.login(registeredUser, err => {
                if(err) return next(err);
                req.flash("success", "Successfully registered!");
                res.redirect(`/user/${registeredUser.dataValues.id}`);
            });
        }).catch(() => {
            req.flash("error", "An account with that email already exists!");
            res.redirect("/register");
        });
    });


    // GET route for loggin a user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });


    //  GET route for landing page
    app.get("/user/:id", isLoggedIn, isOwner, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            res.render("landing", {user: user});
        });
    });


    // GET route for loans page
    app.get("/user/loans/:id", isLoggedIn, isOwner, (req, res) => {
        db.User.findOne({
            where:{
                id: req.params.id
            }
        }).then(user => {
            res.render("loans", {user: user})
        });
    });


    // PUT route for updating a budget for a user
    app.put("/budget/:id", isLoggedIn, isOwner, (req, res) => {
        db.User.update(
            req.body,
            {
                where: {
                    id: req.params.id
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