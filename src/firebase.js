import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: "proger-87bcd.firebaseapp.com",
  projectId: "proger-87bcd",
  storageBucket: "proger-87bcd.appspot.com",
  messagingSenderId: "406148258922",
  appId: "1:406148258922:web:09901c9dda0186bc7afe13",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { db, auth, storage, timestamp };
