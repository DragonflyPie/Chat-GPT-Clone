// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQLHp6IBYDYHcTlhOhvnFpXuk6_2YwXlU",
  authDomain: "chatgpt-messenger-30d4f.firebaseapp.com",
  projectId: "chatgpt-messenger-30d4f",
  storageBucket: "chatgpt-messenger-30d4f.appspot.com",
  messagingSenderId: "246638655343",
  appId: "1:246638655343:web:4f502caebab733e20b9a9a",
  measurementId: "G-Y5W8JGBQS2",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
