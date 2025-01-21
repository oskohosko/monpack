/*
Middleware to handle authentication with our api endpoints.
*/

module.exports = function(req, res, next) {
    // Checks if user is logged in and proceeds.
    if (global.apiLoggedIn) {
        return next();
    // Otherwise we redirect to the signin page.
    } else {
        res.status(404).json({
            "status": "User not logged in. To access, please login."
        });
    };
};