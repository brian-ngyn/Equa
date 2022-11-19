// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZwD1OQxMS3eJlAxrJJtnpida0lflR14g",
  authDomain: "hack-the-change-2022.firebaseapp.com",
  projectId: "hack-the-change-2022",
  storageBucket: "hack-the-change-2022.appspot.com",
  messagingSenderId: "214784846774",
  appId: "1:214784846774:web:44e460dd0eb4029dc52f17",
  measurementId: "G-4T82BPXYCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
export {app, db, firebaseAuth};