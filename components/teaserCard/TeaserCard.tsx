// components/Teasers/TeaserCard.tsx

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// ✅ Definimos los tipos
interface Teaser {
  id: string;
  teaserText: string;
  unlockPrompt: string;
  thumbnailUrl: string;
  price: number;
}

interface TeaserCardProps {
  teaser: Teaser;
  onUnlock: (teaser: Teaser) => void;
}

export default function TeaserCard({ teaser, onUnlock }: TeaserCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: teaser.thumbnailUrl }}
          style={styles.image}
          blurRadius={15}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={styles.overlay}
        />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.text}>{teaser.teaserText}</Text>
          <Ionicons name="lock-closed" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Te atreves a desbloquear?</Text>
            <Text style={styles.modalText}>{teaser.unlockPrompt}</Text>

            <TouchableOpacity
              style={styles.unlockButton}
              onPress={() => {
                onUnlock(teaser);
                setModalVisible(false);
              }}
            >
              <Text style={styles.unlockText}>Desbloquear por ${teaser.price}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

// (Estilos ya definidos antes)

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '40%',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  unlockButton: {
    backgroundColor: '#ff3c75',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  unlockText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#888',
    textDecorationLine: 'underline',
  },
});
