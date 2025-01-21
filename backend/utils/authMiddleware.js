/*
Middleware to handle protected routes and redirect to sign in page.
*/

module.exports = function(req, res, next) {
    // Checks if user is logged in and proceeds.
    if (global.loggedIn) {
        return next();
    // Otherwise we redirect to the signin page.
    } else {
        res.json({ "success": "false" })
    };
};