// Firebase configuration for Mugo Plumbing Solutions Mobile App
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeu2vIi8lx-P2ug2EZLGiTBHK_iCFqg1E",
  authDomain: "mugo-mobile-app-b3c5e.firebaseapp.com",
  projectId: "mugo-mobile-app-b3c5e",
  storageBucket: "mugo-mobile-app-b3c5e.firebasestorage.app",
  messagingSenderId: "794731197122",
  appId: "1:794731197122:web:45e6f93c54afed8893c15b",
  measurementId: "G-39ZX411MS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only if supported)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app; 