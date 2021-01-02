const db = require("../../models");

// Middleware for restricting routes if a user is not the author/owner of the page
module.exports = function(req, res, next) {
    db.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        // If the user is not the owner, redirect them
        if(user.dataValues.id !== req.user.id) {
            console.log("You do not have permission to do that!");
            return res.redirect("/");
        }

        // If the user is the author/owner, continue with the request 
        return next();
    });
}
