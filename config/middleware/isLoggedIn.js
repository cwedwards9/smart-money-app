// Middleware for restricting routes if a user is not logged in
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request
    if (req.user) {
      return next();
    }
  
    // If the user isn't logged in, redirect them to the home page
    return res.redirect("/");
  };