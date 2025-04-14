// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8JcqfqaregtNnLh_mGY11mm5I__RakYo",
  authDomain: "suxy-73564.firebaseapp.com",
  projectId: "suxy-73564",
  storageBucket: "suxy-73564.firebasestorage.app",
  messagingSenderId: "89578771670",
  appId: "1:89578771670:android:fbb237a5b6e5ef8c07a577"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // Esto asegura que la sesión se guarde localmente
export const db = getFirestore(app);
export { auth, firebaseConfig }; // Esto es lo que te falta probablemente
 // Esto es lo que te falta probablemente
