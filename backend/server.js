/**
 * Main file for my Assignment Backend Server
 *
 * Author: Oskar Hosken
 * ID: 31450628
*/

// Basic setup for the web app
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const googleController = require("./controllers/googleCont");

// Constants
const PORT_NUM = 8080;

// Setting up the app
let app = express();

// Server setup
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});


io.on("connection", (socket) => {
    console.log("new connection");

    // To handle translate text (not working don't know why)
    socket.on("translateText", async ([text, targetLanguage]) => {
        console.log("2")
        // Getting the translated text
        try {
            const translateObj = googleController.translate(text, targetLanguage);
            // And emitting it
            socket.emit("getTranslation", translateObj)
        } catch (error) {
            console.error("Error during translation:", error);
            socket.emit("getTranslation", { error: "Translation failed" });
        }
    })
    // Text to speech socket
    socket.on("toSpeech", (licence) => {
        const speechFile = googleController.toSpeech(licence);
        socket.emit("getSpeech", speechFile);
    });

    // Generative AI socket
    socket.on("getDistance", async (text) => {
        const result = await googleController.genAI(text);
        socket.emit("distanceResult", result);
    })
})


// MongoDB Setup
// assignment3 is the name of the DB for me.
const url = "mongodb://127.0.0.1:27017/assignment3";

// Uncomment when using VM for MongoDB
// const url = "mongodb://10.192.0.3:27017/assignment3vm";

// Connecting to the DB
async function connectDB(url) {
    mongoose.connect(url);
    return `Connected to mongoDB.`;
};

// Printing result and catching errors
connectDB(url).then(console.log).catch((error) => {
    console.log(error);
});

// Now MongoDB should be setup.

// And now let's setup Firebase for storage

// Referencing the private key
const serviceAccount = require("./serviceAccountKey.json");

// And initialising access to Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
console.log("Firebase Initialised.");

// Getting our Firebase Controller
const firebaseController = require("./controllers/firebaseCont");

// Using the controller to setup stats collection
async function setup() {
    await firebaseController.initialiseStats();
};
setup();



app.use(express.static("./dist/assignment3/browser"));
app.use(cors());

// EJS stuff
app.set("view engine", "ejs");
// Setting the directory for EJS templates and files
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Middleware to parse url-encoded
app.use(express.urlencoded({ extended: true }));
// JSON
app.use(express.json());

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Global variable to store loggedIn status
global.loggedIn = false;
global.apiLoggedIn = false;

// This is for our bootstrap, css and js
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

// Listening
server.listen(PORT_NUM, () => {
    console.log(`App listening on port number: ${PORT_NUM}.`);
});

const apiAuthRouter = require("./routes/apiAuthRoutes");
app.use("/31450628/Oskar/api/v1/auth", apiAuthRouter);

// This is for our API V1
const apiDriverRouter = require("./routes/apiDriverRoutes");
app.use("/31450628/Oskar/api/v1/drivers", apiDriverRouter);

const apiPackageRouter = require("./routes/apiPackageRoutes");
app.use("/31450628/Oskar/api/v1/packages", apiPackageRouter);

// Stats endpoint
app.get("/31450628/Oskar/stats", async (req, res) => {
    let stats = await firebaseController.getAllStats();
    console.log(stats)
    res.status(200).json(stats);
    // res.render("stats", {title: "Stats", stats: stats});
});

// For resetting stats
app.post('/reset-stats', async (req, res) => {
    try {
        // Calling our reset stats method
        let stats = await firebaseController.resetStats();
        res.status(200).json(stats);
    } catch (error) {
        res.json({ success: false });
    }
});