import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Web uygulaması Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyB_NKP4zQdOYKLMPWEC-gwIx8zOo94-PEg",
  authDomain: "hrms-project-75ffd.firebaseapp.com",
  projectId: "hrms-project-75ffd",
  storageBucket: "hrms-project-75ffd.firebasestorage.app",
  messagingSenderId: "835599904319",
  appId: "1:835599904319:web:0ac0212b7957e8a79ad28a",
  measurementId: "G-2GHZ70CXLE"
};

// Firebase'i başlat
const firebaseApp = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const analytics = typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;

export default firebaseApp; 