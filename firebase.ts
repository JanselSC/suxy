// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig'; // este archivo lo explicaré abajo

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
