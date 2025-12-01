// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDKczbNAgqraY0L5xuKajBfBriJxv_okSg",
  authDomain: "endurance-horse-app.firebaseapp.com",
  projectId: "endurance-horse-app",
  storageBucket: "endurance-horse-app.firebasestorage.app",
  messagingSenderId: "1038571122266",
  appId: "1:1038571122266:web:f946ae58b59700d61d7263",
  measurementId: "G-59SH56925T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore database
export const db = getFirestore(app);



