import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDaRwFP8fbZfI5P3OoUPFzn_xcgv272BCg",
    authDomain: "parking-app-9054f.firebaseapp.com",
    databaseURL: "https://parking-app-9054f-default-rtdb.firebaseio.com",
    projectId: "parking-app-9054f",
    storageBucket: "parking-app-9054f.appspot.com",
    messagingSenderId: "1079113856951",
    appId: "1:1079113856951:web:d9203e09d86cb519991a32",
    measurementId: "G-MMER4J00EX"
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebaseApp.firestore();
export default firebase;
