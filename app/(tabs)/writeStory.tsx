import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  View, ScrollView, Dimensions, Switch, Alert
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { saveStory } from '../../firestore';

const { width } = Dimensions.get('window');

export default function WriteStory() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [locked, setLocked] = useState(false);

  const saveStoryLocal = async (story: {
    title: string;
    content: string;
    tags: string[];
    locked: boolean;
    timestamp: number;
  }) => 
   {
    try {
      const existing = await AsyncStorage.getItem('localStories');
      const stories = existing ? JSON.parse(existing) : [];
      stories.push(story);
      await AsyncStorage.setItem('localStories', JSON.stringify(stories));
    } catch (e) {
      console.error('Error guardando historia local:', e);
    }
  };

  const handleSubmit = async () => {
    if (title && content) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const story = {
        title,
        content,
        tags: tagArray,
        locked,
        timestamp: Date.now()
      };

      // Guardar en Firestore
      const onlineSuccess = await saveStory(title, content, tagArray, locked);

      // Guardar localmente
      await saveStoryLocal(story);

      if (onlineSuccess) {
        alert('Historia enviada de forma anónima');
      } else {
        alert('Guardada localmente. Se enviará cuando haya conexión.');
      }

      setTitle('');
      setContent('');
      setTags('');
      setLocked(false);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setTags('');
    setLocked(false);
  };

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.gradientBackground}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Text style={styles.header}>Escribe tu historia</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Mi noche secreta en el hotel"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Historia</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Cuéntanos todo..."
          placeholderTextColor="#888"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Tags (separados por coma)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: +18, Real, Anónimo"
          placeholderTextColor="#888"
          value={tags}
          onChangeText={setTags}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>¿Bloquear historia?</Text>
          <Switch value={locked} onValueChange={setLocked} />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Publicar Anónimamente</Text>
        </TouchableOpacity>



{/* BOTÓN DE LIMPIAR SIEMPRE VISIBLE PARA PRUEBA */}
<TouchableOpacity
  style={[styles.btn, styles.clearBtn]}
  onPress={handleClear}
>
  <Text style={[styles.btnText, styles.clearBtnText]}>Limpiar</Text>
</TouchableOpacity>


      </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  wrapper: {
    padding: 24,
    paddingBottom: 150,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F4F4F4',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  label: {
    color: '#B8B8D1',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    color: '#000',
    fontSize: 16,
    marginBottom: 20,
  },
  textarea: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    color: '#000',
    fontSize: 16,
    height: 200,
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  btnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  clearBtn: {
    backgroundColor: '#ff338a',
    marginBottom: 50,
  },
  clearBtnText: {
    color: '#fff',
  },
  clearButtonVisible: {
    backgroundColor: '#ff2d55',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
