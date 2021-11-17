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
        data['advisor_name'] = db.doc('users/'+data['advisor_name'])

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
            html: `<b>Project:${data.project_nameTH} <br> You can edit submit <a href="http://localhost:4200/project-update/${_id}"><u>click</u></a></b>`   // HTML body
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

apiRoute.route('/update/:_id').put(multer.single('file'), async (req, res, next) => {
    try {
        let _id = req.params._id
        if (req.file.mimetype !== "application/pdf") {
            res.status(415).json('Unsupported Media Type')
            return
        }
        let data = JSON.parse(req.body.dataProject)
        data['approve'] = false
        data['advisor_name'] = db.doc('users/'+data['advisor_name'])
        
        const folder = 'fileProject'
        const filename = `${folder}/${_id}`
        // console.log(filename);

        await getStorage().bucket().file(filename).delete()

        await projectDb.doc(_id).update(data)

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

apiRoute.route('/approve').put(async(req,res,next)=>{
try {
    await projectDb.doc(req.body._id).update({'approve':req.body.approve})
    res.status(200).json('update complete')
} catch (error) {
    return next(error);
}
})

apiRoute.route('/delete-project/:_id').delete(async(req, res, next)=>{
    try {
        let _id = req.params._id
        const folder = 'fileProject'
        const filename = `${folder}/${_id}`
        await getStorage().bucket().file(filename).delete()
        await projectDb.doc(_id).delete()

        res.status(200).json('delete complete')
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
        let data = await projectDb.doc(req.params._id).get();
        
        data = data.data()
        let temp = await data.advisor_name.get()
        data.advisor_name = {
            '_id' : temp.id,
            "firstname": temp.data().firstname,
            "lastname": temp.data().lastname,
        }
        // console.log(data);
        res.json(data);
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

module.exports = apiRoute;