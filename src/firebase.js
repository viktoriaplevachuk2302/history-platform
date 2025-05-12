import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ініціалізація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4Js9WSToqN8ktlLxl7l8IDBXuQRdvIWA",
  authDomain: "historyapp-8b0e5.firebaseapp.com",
  projectId: "historyapp-8b0e5",
  storageBucket: "historyapp-8b0e5.firebasestorage.app",
  messagingSenderId: "952681540686",
  appId: "1:952681540686:web:658b1b15d27e056bae671f",
  measurementId: "G-MDC8YM8V2R"
};

const app = initializeApp(firebaseConfig);

// Firebase сервіси
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Експорти
export { auth, db, provider };
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
