import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Web uygulaması Firebase yapılandırması
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyYourAPIKey",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "hrms-demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "hrms-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "hrms-demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abc123def456"
};

// Firebase'i başlat
const firebaseApp = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp; 