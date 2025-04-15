// components/Creators/UploadContent.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function UploadContent() {
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [teaserText, setTeaserText] = useState('');
  const [unlockPrompt, setUnlockPrompt] = useState('');
  const [price, setPrice] = useState('');

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type === 'video' ? 'video' : 'image');
    }
  };

  const handleSubmit = () => {
    if (!media || !teaserText || !unlockPrompt || !price) {
      alert('Completa todos los campos.');
      return;
    }

    // Aquí subiremos a Firebase o backend lo que se haya ingresado
    console.log({ media, teaserText, unlockPrompt, price });
    alert('¡Teaser enviado con éxito!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sube tu contenido provocador 🔥</Text>

      <TouchableOpacity style={styles.mediaPicker} onPress={pickMedia}>
        {media ? (
          mediaType === 'video' ? (
            <Video
              source={{ uri: media }}
              style={styles.preview}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay={false}
            />
          ) : (
            <Image source={{ uri: media }} style={styles.preview} />
          )
        ) : (
          <Text style={styles.placeholder}>Toca para subir foto o video teaser</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Frase provocadora (ej: ¿Te atreves a adivinar?)"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={teaserText}
        onChangeText={setTeaserText}
      />

      <TextInput
        placeholder="Texto a desbloquear (opcional)"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={unlockPrompt}
        onChangeText={setUnlockPrompt}
      />

      <TextInput
        placeholder="Precio de desbloqueo en USD (ej: 1.99)"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Publicar teaser</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  mediaPicker: {
    height: 250,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    color: '#aaa',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#ff2d55',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
