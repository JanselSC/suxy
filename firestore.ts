// services/firestore.ts
import { collection, addDoc, Timestamp  } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const saveStory = async (title: string, content: string) => {
  try {
    await addDoc(collection(db, 'histories'), {
      titulo: title,
      contenido: content,
      createdAt: Timestamp.now (),
    });
    return true;
  } catch (error) {
    console.error('Error al guardar historia:', error);
    return false;
  }
};
