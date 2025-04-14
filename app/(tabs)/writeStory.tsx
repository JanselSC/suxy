import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { saveStory } from '../../firestore';

const { width } = Dimensions.get('window');

export default function WriteStory() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (title && content) {
      const success = await saveStory(title, content);
      if (success) {
        alert('Historia enviada de forma anónima ');
        setTitle('');
        setContent('');
      } else {
        alert('Error al guardar la historia.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
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

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Publicar Anónimamente</Text>
        </TouchableOpacity>

        {(title !== '' || content !== '') && (
          <TouchableOpacity style={[styles.btn, styles.clearBtn]} onPress={handleClear}>
            <Text style={[styles.btnText, styles.clearBtnText]}> Limpiar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  wrapper: {
    padding: 24,
    paddingBottom: 100,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
  },
  textarea: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    color: '#000',
    fontSize: 16,
    height: 200,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
  },
  btn: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
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
});
