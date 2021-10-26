const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    createError = require("http-errors");


const admin = require("firebase-admin");
const serviceAccount = require('./db/ServiceAccount.json');
//Initialize the app
const FirebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "project-archive-system.appspot.com"
});



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

//API
const API = require("./routers/api.route");
app.use("/api", API);

//create port
// Handle production
if (process.env.NODE_ENV === "production") {
    // Static folder
    app.use(express.static(__dirname + "/public/"));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log("Connected to port " + port);
});

//404 Handler
app.use((req, res, next) => {
    next(createError(404));
});

//error Handler
app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});