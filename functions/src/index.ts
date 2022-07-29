import { https, logger, firestore } from 'firebase-functions';
import * as admin from 'firebase-admin';


import { initializeApp } from 'firebase/app';
import { FieldPath, getFirestore, collection, query, getDocs, where, doc, DocumentData } from 'firebase/firestore';

import * as express from 'express';
import * as cors from 'cors';
import { FIREBASE_CONFIG } from './constants';


admin.initializeApp();

// todoc realtime db용 초기화
// export const db = getDatabase(initializeApp(FIREBASE_CONFIG));

// todoc cloud db 초기화
const store = getFirestore(initializeApp(FIREBASE_CONFIG));

const app = express();
app.use(cors({ origin: true }));
app.use(async (req, res, next) => {
  console.log('time: ', Date.now());
  // fixme firebase admin 인증절차
  // jwt 에 적용가능 firebase auth로 로그인 하면 accesToken을 내려주는데 해당 토큰을 헤더에 담아 던져서 verifyIdToken(accesToken을) 로그인 유저정보 획득 가능
  // const { uid } = await admin.auth().verifyIdToken('AOEOulY9333nl-I3-Krkk0HqgKu2S77U2-mJmOmTHecTmt3gYLr6RZaJ2ZnKwHcWXVfHaDmHEREEsZbqa6TI1BKiy-yL6E1kAfUByMQkM6vpuecZBTG4Jj2ZZkxth5l5hXYYVsBkukzAAjq-ZM3GLiWdEwR5nimQwfxcziQSSt_0CU7eh6NU-qjUonOpqJhkTfu_PJz0RpLr');
  // console.log('uid', uid);
  // fixme 악그인 유저가 변경 될 경우 호출 되는것으로 파악
  // onAuthStateChanged(getAuth(), user => {
  //   console.log('getAuth', user);
  // });
  next();
});

// fixme 게시판 functions 활용때 사용 예정
app.get('/dash-board/:id', async (req, res) => {
  console.log('id', req.params.id);

  const docSnap = await query(collection(store, 'dash-board'));
  console.log(docSnap);

  res.json({ content: 'adfasdg', title: '12312312'});
});

app.get('/dash-board', async (req, res) => {
  const docSnap = await getDocs(collection(store, 'dash-board'));
  const list: DocumentData[] = [];
  // tslint:disable-next-line:no-shadowed-variable
  docSnap.forEach(doc => {
    list.push({...doc.data(), id: doc.id});
  });
  res.json(list);
});

app.put('/dash-board', async (req, res) => {
  const { title, content } = req.body;
  // fixme real db
  // const result = await update(ref(db), {
  //   [`dash-board/5`]: {
  //     title,
  //     content,
  //     uid: '3',
  //     createAt: new Date()
  //   }
  // });
  res.json({ test: 'agafasdfdf'});
});

export const api = https.onRequest(app);


// fixme test code
// export const helloWorld = https.onRequest((request, response) => {
//   logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
//
// export const addMessage = https.onRequest(async (req, res) => {
//   const original = req.query.text;
//   const writeResult = await admin.firestore().collection('messages')
//     .add({ original });
//
//   res.json({ result: `message with id: ${ writeResult } added`});
// });
//
// export const makeUppercase = firestore.document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;
//
//     logger.log(`upper casing`, context.params.documentId, original);
//
//     const uppercase = original.toUpperCase();
//
//     return snap.ref.set({uppercase}, {merge: true});
//   });
//
