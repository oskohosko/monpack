/*
Controller I am making to help manage the Firestore database.
*/

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
    // Helper function to initialise the stats if it doesn't exist
    initialiseStats: async function() {
        // Helper function to initialize the collection if it doesn't exist
        const statsRef = db.collection("stats");
        const snapshot = await statsRef.get();
        if (snapshot.empty) {
            await this.resetStats();
            console.log("Stats collection created.")
        };
    },
    // Helper function to increment the insert counter
    incrementInsert: async function() {
        // Referencing our data document
        let dataRef = db.collection("stats").doc("data");
        // Updating inserts by 1
        await dataRef.update({
            "inserts": admin.firestore.FieldValue.increment(1)
        });
    },
    // Helper function to increment the get counter
    incrementGet: async function() {
        // Referencing our data document
        let dataRef = db.collection("stats").doc("data");
        // Updating inserts by 1
        await dataRef.update({
            "gets": admin.firestore.FieldValue.increment(1)
        });
    },
    // Helper function to increment the update counter
    incrementUpdate: async function() {
        // Referencing our data document
        let dataRef = db.collection("stats").doc("data");
        // Updating inserts by 1
        await dataRef.update({
            "updates": admin.firestore.FieldValue.increment(1)
        });
    },
    // Helper function to increment the delete counter
    incrementDelete: async function() {
        // Referencing our data document
        let dataRef = db.collection("stats").doc("data");
        // Updating inserts by 1
        await dataRef.update({
            "deletes": admin.firestore.FieldValue.increment(1)
        });
    },
    // Function that gets all our stats
    getAllStats: async function() {
        let dataRef = db.collection("stats").doc("data");
        const doc = await dataRef.get();
        return doc.data();
    },
    // Resets the counters.
    resetStats: async function() {
        // Getting a reference to our stats collection
        let dataRef = db.collection("stats").doc("data");
        // And setting up our data collection
        await dataRef.set({
            "inserts": 0,
            "gets": 0,
            "updates": 0,
            "deletes": 0
        });

        const doc = await dataRef.get();
        return doc.data();
    },
    // Adds a user to firestore
    addUser: async function(username, password) {
        // Adding the user to our collection
        await db.collection("users").add({
            "username": username,
            "password": password
        });
    },
    // Checks if the username exists
    checkUsername: async function(username) {
        const usersRef = db.collection("users");
        const query = usersRef.where("username", "==", username);

        const isUsername = await query.get();
        if (isUsername.empty) {
            return false
        } else {
            return true
        };
    },
    // Checks the password for the user
    checkPassword: async function(username, password) {
        const usersRef = db.collection("users");
        const userQuery = usersRef.where("username", "==", username);

        const querySnapshot = await userQuery.get();

        // No users with username
        if (querySnapshot.empty) {
            return false;
        };

        let passwordMatch = false;

        querySnapshot.forEach(doc => {
            const userData = doc.data();
            if (userData.password === password) {
                passwordMatch = true;
            }
        });

        return passwordMatch;
    }
};