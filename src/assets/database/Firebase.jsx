import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = { 
    apiKey: "AIzaSyCR82CvE80eQZZAhkqnl3zN2hbkeXJuJEk",
    authDomain: "aslan-production.firebaseapp.com",
    projectId: "aslan-production",
    storageBucket: "aslan-production.appspot.com",
    messagingSenderId: "630237116594",
    appId: "1630237116594:web:c74a75b4c9a153533271ab",
    measurementId: "G-FSWD8M9C42"
 
}

const app = initializeApp (firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore(app);
export default app
