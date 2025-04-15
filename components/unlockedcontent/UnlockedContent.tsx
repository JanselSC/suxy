// components/Teasers/UnlockedContent.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,

} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

interface UnlockedContentProps {
  contentType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function UnlockedContent({
  contentType,
  mediaUrl,
  caption,
  onClose,
}: UnlockedContentProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        {contentType === 'image' ? (
          <Image source={{ uri: mediaUrl }} style={styles.image} resizeMode="cover" />
        ) : (
<Video
  source={{ uri: mediaUrl }}
  style={styles.video}
  useNativeControls
  resizeMode={ResizeMode.CONTAIN} // ✅ Corregido
  isLooping
  shouldPlay
/>

        )}

        {caption && <Text style={styles.caption}>{caption}</Text>}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width * 1.2,
    borderRadius: 12,
  },
  video: {
    width: '100%',
    height: width * 1.2,
    borderRadius: 12,
  },
  caption: {
    color: '#ccc',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff2d55',
    borderRadius: 10,
  },
});
