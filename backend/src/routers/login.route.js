const express = require("express");
const apiRoute = express.Router();

const admin = require("firebase-admin");
const db = admin.firestore();
const usersDb = db.collection('users');

const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}
async function validatePassword(password, hash) { // updated
    const isSame = await bcrypt.compare(password, hash) // updated
    return isSame // updated
}

apiRoute.route('/validate-login').post(async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let data = await usersDb.where("username", "==", username).get()

        if (data.empty) {
            res.status(401).send('Login Failure')
            return
        }

        let tempDict = null
        data.forEach(async(doc) => {
            tempDict = doc.data()
            tempDict['_id'] = doc.id
        });
        if(await validatePassword(password,tempDict.password)){
            delete tempDict.password;
            res.json(tempDict);
        }else{
            res.status(401).send('Login Failure')
        }
        
    } catch (error) {
        return next(error);
    }
})
apiRoute.route('/insert-user').post(async (req, res, next) => {
    try {


        let data = {
            "username": String(req.body.username),
            "password": await hashPassword(req.body.password),
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
        console.log(req.body.password);
        let data = {
            password: await hashPassword(req.body.password),
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

apiRoute.route('/get-teacher').get(async (req, res, next) => {
    try {
        let data = await usersDb.where('role', '==', 'Teacher').get();

        let tempDict = []
        data.forEach(doc => {
            let tempData = doc.data()
            tempDict.push({
                '_id': doc.id,
                'firstname': tempData.firstname,
                'lastname': tempData.lastname
            })
        });
        res.json(tempDict);
    } catch (error) {
        return next(error.status);
    }
})


module.exports = apiRoute;