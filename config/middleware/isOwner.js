const db = require("../../models");

// Middleware for restricting routes if a user is not the author/owner of the page
module.exports = function(req, res, next) {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        // If the user is not the owner, or is trying to access a user's route that doesn't exist, redirect them
        if(user == null || user.dataValues.id !== req.user.id) {
            console.log("You do not have permission to do that!");
            return res.redirect(`/user/${req.user.id}`);
        }

        // If the user is the author/owner, continue with the request 
        return next();
    });
}
