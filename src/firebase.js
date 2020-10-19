
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


firebase.initializeApp({
    apiKey: "AIzaSyAYTcB2Yw07JBPZ9cxQBTtDN9d_TYrrcWM",
    authDomain: "project-3784553962565388353.firebaseapp.com",
    databaseURL: "https://project-3784553962565388353.firebaseio.com",
    projectId: "project-3784553962565388353",
    storageBucket: "project-3784553962565388353.appspot.com",
    messagingSenderId: "913611945749",
    appId: "1:913611945749:web:9b16a295c1f61b6dc91b1c"
  
  })
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();