const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
//adding service account key
var serviceAccount = require("./permissions_key.json"); //key generate kore 'functions folder a rakha hoiche.'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rest-api-and-cloud-functions.firebaseio.com"
});

const express = require('express');
const app = express();

const db = admin.firestore(); //root url of firebase
const cors = require('cors'); /*CORS(Cross-Origin Resource Sharing) is a node. js package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
app.use( cors( {origin:true} ) ); //different origin/domain a access korar jonno 'cors' use kora holo

//Routes

//default route
app.get('/',(req,res) =>{
    return res.status(200).send('Hello World');
} ); //base url hit korle "hello world" output dekhabe.

//Create
//Post
app.post('/api/create',(req,res) =>{

    (async () =>{

        try{

            await db.collection('products').doc('/'+ req.body.id +'/')
            .create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            })
            return res.status(200).send();
        }catch(error){
            console.log(error);
            return res.status(500).send(error);

        }

    })();

});
    

//Read
//Get
app.get('/api/read/:id',(req,res) =>{

    (async () =>{

        try{

            const document = db.collection('products').doc(req.params.id);
            let product = await document.get();
            let response = product.data(); //json format

            return res.status(200).send(response);
        }catch(error){
            console.log(error);
            return res.status(500).send(error);

        }

    })();

});

//read all products
app.get('/api/read_all_products',(req,res) =>{

    (async () =>{

        try{

            let query = db.collection('products');
            let response = [];
            await query.get().then(querysnapshot =>{
                let docs = querysnapshot.docs;

                for(let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price
                    };
                    response.push(selectedItem);
                }
                return response;
            })

            return res.status(200).send(response);
        }catch(error){
            console.log(error);
            return res.status(500).send(error);

        }

    })();

});

//Update
// Put
app.put('/api/update_product/:id',(req,res) =>{

    (async () =>{

        try{

            const document = db.collection('products').doc(req.params.id);
            await document.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            });

            return res.status(200).send();
        }catch(error){
            console.log(error);
            return res.status(500).send(error);

        }

    })();

});


//export the api to firebase cloud functions
exports.app = functions.https.onRequest(app); //handle all api request