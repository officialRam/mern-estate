// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-53a8b.firebaseapp.com",
  projectId: "mern-estate-53a8b",
  storageBucket: "mern-estate-53a8b.appspot.com",
  messagingSenderId: "266923925279",
  appId: "1:266923925279:web:4b4ae226d7ca0ac5491a2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);