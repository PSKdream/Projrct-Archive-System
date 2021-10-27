const express = require("express");
const apiRoute = express.Router();
const Multer = require('multer');

const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

const usersDb = db.collection('users');


apiRoute.route('/test').get((req, res, next) => {
    res.json('test.....');
})
apiRoute.route('/validate-login').post(async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let data = await usersDb.where("username","==",username).where("password","==",password).get()
        
        if (data.empty) {
            res.status(401).send('Login Failure')
        }  

        let tempDict = null
        data.forEach(doc => {
            tempDict = doc.data()
            delete tempDict.password; 
            tempDict['_id'] = doc.id        
        });
        res.json(tempDict);
    } catch (error) {
        return next(error);
    }
})
apiRoute.route('/insert-user').post(async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let role = req.body.role

        let data = await usersDb.where("username","==",username).get()
        if (!data.empty) {
            res.status(409).send('User conflict')
        }

        await usersDb.doc().set({
            username: String(username),
            password: String(password),
            firstname: String(firstname),
            lastname: String(lastname),
            role: String(role),
        });
        res.json();
    } catch (error) {
        return next(error);
    }
})

module.exports = apiRoute;