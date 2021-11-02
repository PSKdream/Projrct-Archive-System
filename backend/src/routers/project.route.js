const express = require("express");
const Multer = require('multer');
const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');
const nodemailer = require('nodemailer');
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

//Mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'norrapat.kammonn@gmail.com', // your email
        pass: '0844650132' // your email password
    }
});


apiRoute.route('/test').get((req, res, next) => {
    res.json('test.....');
})
apiRoute.route('/upload').post(multer.single('file'), async (req, res, next) => {
    try {

        if (req.file.mimetype !== "application/pdf") {
            res.status(415).json('Unsupported Media Type')
            return
        }
        let data = JSON.parse(req.body.dataProject)
        data['approve'] = false

        let _id = await projectDb.add(data)
            .then((docRef) => {
                return docRef.id
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        const folder = 'fileProject'
        const filename = `${folder}/${_id}`
        const fileUpload = bucket.file(filename)
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })

        blobStream.on('error', (err) => {
            res.status(405).json(err)
        })
        blobStream.end(req.file.buffer)
        // blobStream.on('finish', (err) => {
        //     res.status(200).json('upload complete')
        // })
        let mailOptions = {
            from: 'project-achive@pim.ac.th',                // sender
            to: `${data.developNames[0].ID}@stu.pim.ac.th`,                // list of receivers
            subject: 'Confirm submit project',              // Mail subject
            html: `<b>You can edit submit <a href="http://localhost:4200/project-update/${_id}"><u>click</u></a></b>`   // HTML body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                res.status(400).json(err)
            else
                res.status(200).json('upload complete')
        });



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
            expires: Date.now() + 1000 * 60 * 60 * 2, // two hour
        };
        const fileName = `fileProject/${req.params.id}`;
        var url = await getStorage().bucket()
            .file(fileName).getSignedUrl(options)
        res.json(url)

    } catch (error) {
        return next(error);
    }
})

apiRoute.route('/sent-mail').get(async (req, res, next) => {
    try {
        let mailOptions = {
            from: 'project-achive@pim.ac.th',                // sender
            to: 'dram-1234567@hotmail.com',                // list of receivers
            subject: 'Hello from sender',              // Mail subject
            html: '<b>Do you receive this mail?</b>'   // HTML body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        res.json('test')
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