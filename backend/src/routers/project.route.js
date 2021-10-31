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


apiRoute.route('/test').get((req, res, next) => {
    res.json('test.....');
})
apiRoute.route('/upload').post(multer.single('file'), async (req, res, next) => {
    try {
        // console.log(req.file);
        // console.log(req.body);
        // let result = await projectDb.doc().set(JSON.parse(req.body.dataProject));
        
        let _id = await projectDb.add(JSON.parse(req.body.dataProject))
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                return docRef.id
               
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        const folder = 'profile'
        const filename = `${folder}/${_id}`
        const fileUpload = bucket.file(filename)
        // console.log(req);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobStream.on('error', (err) => {
            res.status(405).json(err)
        })

        blobStream.on('finish', (err) => {
            res.status(200).json('upload complete')
        })
        blobStream.end(req.file.buffer)

    } catch (error) {
        return next(error);
    }
})


apiRoute.route('/project').get(async (req, res, next) => {
    try {
        let data = await projectDb.get();

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

module.exports = apiRoute;