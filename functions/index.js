const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors'); /*CORS(Cross-Origin Resource Sharing) is a node. js package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
const app = express();


//Routes
app.get('/',(req,res) =>{
    return res.status(200).send('Hello World');
} ) //base url hit korle "hello world" output dekhabe.


//export the api to firebase cloud functions
exports.app = functions.https.onRequest(app); //handle all api request