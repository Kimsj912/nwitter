// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { initializeApp }  from 'firebase/app';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc, getDocs, setDoc, collection, query, orderBy, onSnapshot} from  'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID ,
    appId: process.env.REACT_APP_APP_ID ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authService = getAuth();
export {authService, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,createUserWithEmailAndPassword};
export const dbService = getFirestore();
export {collection, addDoc, getDocs, setDoc, query, orderBy, onSnapshot};