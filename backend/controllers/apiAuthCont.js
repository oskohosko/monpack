/*
Authentication controller for our api endpoints.
*/

const firebaseController = require("./firebaseCont");

module.exports = {
    // Login method to facilitate logging in via the API endpoints.
    login: async function(req, res) {
        // Getting details
        const username = req.body.username;
        const password = req.body.password;

        // Checking if the password is correct with the given username.
        const exists = await firebaseController.checkPassword(username, password);
        // If it exists, we update our global logged in variable.
        if (exists) {
            global.apiLoggedIn = true;
            res.status(200).json({
                "status": "Logged In Successfully"
            });
        } else {
            res.status(404).json({
                "status": "Log In Failed."
            })
        };
    },
    signUp: async function(req, res) {
        // Getting details
        const username = req.body.username;
        const password1 = req.body.password;
        const password2 = req.body.confirm;

        // Error checking
        let checkEqual = password1 == password2;
        let checkLength = password1.length <= 10 && password1.length >= 5;
        let checkUsername = username.length >= 6;
        // This means everything is all good
        if (checkEqual && checkLength && checkUsername) {
            // Checking if the username already exists
            const userExists = await firebaseController.checkUsername(username);
            if (userExists) {
                res.status(404).json({
                    "status": "User already exists."
                });
            // If it doesn't, we add the user in.
            } else {
                await firebaseController.addUser(username, password1);
                res.status(200).json({
                    "status": "Signed up successfully."
                });
            };
        } else {
            res.status(500).json({
                "status": "Sign up failed."
            });
        };
    }
}