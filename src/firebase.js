// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyDgDSTuqZQEB0IgHrcFHAlHgxT6XGcUc9M",
	authDomain: "food-xpress-2cbe9.firebaseapp.com",
	projectId: "food-xpress-2cbe9",
	storageBucket: "food-xpress-2cbe9.firebasestorage.app",
	messagingSenderId: "286887886775",
	appId: "1:286887886775:web:0257be891f3b03e1eef232",
	measurementId: "G-XVL24337RE"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
