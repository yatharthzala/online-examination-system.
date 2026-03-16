// setup.js
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6BAKiFCcsuRTdMhOM3iI_3VVD4Zoq60M",
  authDomain: "attendance-8cb33.firebaseapp.com",
  projectId: "attendance-8cb33",
  storageBucket: "attendance-8cb33.firebasestorage.app",
  messagingSenderId: "232075335570",
  appId: "1:232075335570:web:4931a998bc9c66b837934b",
  measurementId: "G-VFJCCYSRKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);