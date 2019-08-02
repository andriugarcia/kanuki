const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise')

admin.initializeApp({
    apiKey: "AIzaSyA6_aIWPJnAAQGxrPAr-c8IuFs-aa_N49c",
    authDomain: "kanuki-app.firebaseapp.com",
    databaseURL: "https://kanuki-app.firebaseio.com",
    projectId: "kanuki-app",
    storageBucket: "kanuki-app.appspot.com",
    messagingSenderId: "774180793403"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.toElastic = functions.firestore
    .document('pages/{pageId}')
    .onWrite((change, context) => {

        const postData = change.after.data();

        // Get an object with the previous document value (for update or delete)

        let post_id = context.params.pageId

        console.log(post_id)
        console.log("Indexing: ", postData)

        let elasticSearchConfig = functions.config().elasticsearch
        let elasticSearchUrl = elasticSearchConfig.url + 'pages/page/' + post_id
        let elasticSearchMethod = change.after.exists ? 'POST' : 'DELETE'

        let body = (change.after.exists) ? {
            "id": postData.id,
            "url": postData.url,
            "Visits": postData.Visits,
            "Saves": postData.Saves,
            "Type": postData.Type,
            "Title": postData.Title,
            "Read": postData.Read,
            "Content": {
                "Tags": postData.Content.Tags,
                "Description": postData.Content.Description,
                "Color": postData.Content.Color
            },
            "Author": postData.Author,
            "createdAt": postData.createdAt
        } : {}

        let elasticSearchRequest = {
            method: elasticSearchMethod,
            url: elasticSearchUrl,
            body,
            json: true
        }

        return request(elasticSearchRequest).then((res) => console.log("Page sent to elasticsearch", res))
                .catch(err => console.error(err))


    })

exports.deletePage = functions.firestore
    .document('pages/{pageId}')
    .onDelete((snap, context) => {
        var db = admin.firestore();

        const page = snap.data();

        var promises = []

        page.Content.Elements.forEach(function (el) {
            console.log(`${page.url.replace(/\//g, ".")}.${el.id}`)
            promises.push(db.collection('pages').doc(`${page.url.replace(/\//g, ".")}.${el.id}`).delete().then(() => {
                console.log("Borrado correctamente")
            }))
        })

        console.log("Funcion finalizada: ")
        console.log(promises)

        return Promise.all(promises)


    });
