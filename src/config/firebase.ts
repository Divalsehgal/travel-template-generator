import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6at5lp23VixfDxpu64ejyNX4j4aCpIKE",
  authDomain: "travel-template-engine.firebaseapp.com",
  projectId: "travel-template-engine",
  storageBucket: "travel-template-engine.firebasestorage.app",
  messagingSenderId: "118350426635",
  appId: "1:118350426635:web:4ea7296ff3ed9e8295cd0e",
  measurementId: "G-Q8YPQMXPEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
