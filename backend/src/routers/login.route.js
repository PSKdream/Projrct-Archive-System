const express = require("express");
const Multer = require('multer');
const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');

const apiRoute = express.Router();
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const db = admin.firestore();

const bucket = getStorage().bucket();

const usersDb = db.collection('users');
const projectDb = db.collection('projects');


apiRoute.route('/validate-login').post(async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let data = await usersDb.where("username", "==", username).where("password", "==", password).get()

        if (data.empty) {
            res.status(401).send('Login Failure')
            return
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


        let data = {
            "username": String(req.body.username),
            "password": String(req.body.password),
            "firstname": String(req.body.firstname),
            "lastname": String(req.body.lastname),
            "role": String(req.body.role)
        }

        let user = await usersDb.where("username", "==", req.body.username).get()
        if (!user.empty) {
            res.status(409).send('User conflict')
            return
        }

        await usersDb.doc().set(data);
        res.json();
        //res.status(200).send('OK')
    } catch (error) {
        return next(error);
    }
})
apiRoute.route('/update-user').put(async (req, res, next) => {
    try {
        let data = {
            firstname: String(req.body.firstname),
            lastname: String(req.body.lastname),
            role: String(req.body.role)
        }

        await usersDb.doc(req.body._id).update(data)
        res.json();
    } catch (error) {
        return next(error.status);
    }
})
apiRoute.route('/update-password').put(async (req, res, next) => {
    try {
        let data = {
            password: String(req.body.password),
        }
        await usersDb.doc(req.body._id).update(data)
        res.json();
    } catch (error) {
        return next(error.status);
    }
})
apiRoute.route('/delete-user/:_id').delete(async (req, res, next) => {
    try {
        await usersDb.doc(req.params._id).delete()
        res.json();
    } catch (error) {
        return next(error.status);
    }
})
apiRoute.route('/get-user').get(async (req, res, next) => {
    try {
        let data = await usersDb.get();

        let tempDict = []
        data.forEach(doc => {
            let tempData = doc.data()
            delete tempData.password;
            tempData['_id'] = doc.id
            tempDict.push(tempData)
        });
        res.json(tempDict);
    } catch (error) {
        return next(error.status);
    }
})

apiRoute.route('/get-teacher').get(async(req,res,next) =>{
    try {
        let data = await usersDb.where('role','==','Teacher').get();

        let tempDict = []
        data.forEach(doc => {
            let tempData = doc.data()
            tempDict.push({
                '_id': doc.id,
                'firstname': tempData.firstname,
                'lastname' : tempData.lastname
            })
        });
        res.json(tempDict);
    } catch (error) {
        return next(error.status);
    }
})


module.exports = apiRoute;