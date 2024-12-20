// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZsNtPJ845IT-meefXBG9F89J47I8mJC8",
  authDomain: "spark-fitness-2f0d5.firebaseapp.com",
  projectId: "spark-fitness-2f0d5",
  storageBucket: "spark-fitness-2f0d5.firebasestorage.app",
  messagingSenderId: "1064813394531",
  appId: "1:1064813394531:web:7404a67569d64eab4e5656",
  measurementId: "G-48JCF0PE8D"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;