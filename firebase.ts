import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQLHp6IBYDYHcTlhOhvnFpXuk6_2YwXlU",
  authDomain: "chatgpt-messenger-30d4f.firebaseapp.com",
  projectId: "chatgpt-messenger-30d4f",
  storageBucket: "chatgpt-messenger-30d4f.appspot.com",
  messagingSenderId: "246638655343",
  appId: "1:246638655343:web:4f502caebab733e20b9a9a",
  measurementId: "G-Y5W8JGBQS2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
