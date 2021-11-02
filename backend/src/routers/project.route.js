const express = require("express");
const Multer = require('multer');
const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');
const { firestore } = require("firebase-admin");

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
        if (req.file.mimetype !== "application/pdf") {
            res.status(415).json('Unsupported Media Type')
            return
        }

        let _id = await projectDb.add(JSON.parse(req.body.dataProject))
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                return docRef.id

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        const folder = 'fileProject'
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

apiRoute.route('/project/:_id').get(async (req, res, next) => {
    try {
        // console.log(req.params._id);
        let data = await projectDb.doc(req.params._id).get();
        res.json(data.data());
    } catch (error) {
        return next(error.status);
    }
})

apiRoute.route('/fileProject/:id').get(async (req, res, next) => {
    try {
        // Create a reference to the file we want to download
        const options = {
            version: 'v2', // defaults to 'v2' if missing.
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // one hour
        };
        const fileName = `fileProject/${req.params.id}`;
        var url = await getStorage().bucket()
            .file(fileName).getSignedUrl(options)
        res.json(url)

    } catch (error) {
        return next(error);
    }
})
// https://firebasestorage.googleapis.com/v0/b/project-archive-system.appspot.com/o/Resume.pdf?alt=media

// app.post('/asset', function(request, response){
//     var tempFile="/home/applmgr/Desktop/123456.pdf";
//     fs.readFile(tempFile, function (err,data){
//        response.contentType("application/pdf");
//        response.send(data);
//     });
//   });
module.exports = apiRoute;