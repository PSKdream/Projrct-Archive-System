const express = require("express");
const apiRoute = express.Router();
const Multer = require('multer');

const admin = require("firebase-admin");
const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

apiRoute.route('/test').get((req, res, next) => {
    res.json('test.....');
})

module.exports = apiRoute;