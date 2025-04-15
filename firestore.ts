import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Tipos
export interface Story {
  id: string;
  title: string;
  content: string;
  tags: string[];
  locked: boolean;
  createdAt: Timestamp;
}

// Guardar historia
export const saveStory = async (
  title: string,
  content: string,
  tags: string[] = [],
  locked: boolean = false
): Promise<boolean> => {
  try {
    await addDoc(collection(db, 'stories'), {
      title,
      content,
      tags,
      locked,
      createdAt: Timestamp.now(),
    });
    return true;
  } catch (e) {
    console.error('Error al guardar historia:', e);
    return false;
  }
};

// Obtener historias
export const getStories = async (): Promise<Story[]> => {
  try {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title || 'Sin título',
        content: data.content || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        locked: typeof data.locked === 'boolean' ? data.locked : false,
        createdAt: data.createdAt || Timestamp.now(),
      };
    });
  } catch (e) {
    console.error('Error al obtener historias:', e);
    return [];
  }
};
