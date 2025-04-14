import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

interface UnlockModalProps {
  visible: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export default function UnlockModal({ visible, onClose, onUnlock }: UnlockModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}> Desbloquear Historia</Text>
          <Text style={styles.text}>Esta historia es demasiado intensa para mostrarla gratis.</Text>
          <Text style={styles.text}>¿Quieres desbloquearla con 1 token o acceder con VIP?</Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={onUnlock}>
            <Text style={styles.btnText}>Usar 1 Token</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.btnText}>Ver planes VIP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1d',
    padding: 28,
    borderRadius: 24,
    width: width - 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  primaryBtn: {
    backgroundColor: '#00e0ff',
    paddingVertical: 14,
    borderRadius: 30,
    width: width - 100,
    marginTop: 20,
  },
  secondaryBtn: {
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 30,
    width: width - 100,
    marginTop: 12,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
  cancel: {
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
});
