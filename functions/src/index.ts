import { https, logger, firestore } from "firebase-functions";
import * as admin from "firebase-admin";
import { getDatabase, ref, child, get } from 'firebase/database'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

import * as express from 'express';
import * as cors from 'cors'

export const db = getDatabase()
export const dbRef = ref(db)

const app = express()
app.use(cors({ origin: true }))

admin.initializeApp()

app.use(function(req, res, next) {
  console.log('time: ', Date.now())
})

// fixme 게시판 functions 활용때 사용 예정
app.get('/dash-board/:id', (req, res) => {

})

export const api = https.onRequest(app)




// fixme test code
export const helloWorld = https.onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const addMessage = https.onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await admin.firestore().collection('messages')
    .add({ original })

  res.json({ result: `message with id: ${ writeResult } added`});
});

export const makeUppercase = firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    const original = snap.data().original;

    logger.log(`upper casing`, context.params.documentId, original)

    const uppercase = original.toUpperCase()

    return snap.ref.set({uppercase}, {merge: true})
  })
