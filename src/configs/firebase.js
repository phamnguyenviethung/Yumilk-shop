import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'milkshop-b90d7.firebaseapp.com',
  projectId: 'milkshop-b90d7',
  storageBucket: 'milkshop-b90d7.appspot.com',
  messagingSenderId: '221425865980',
  appId: '1:221425865980:web:de56473b4731f231a97379',
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
