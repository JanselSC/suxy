import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // si estás usando expo-router

const { width } = Dimensions.get('window');

export default function VIPCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // para navegar a BuyCoinsScreen

  const handleUnlockWithTokens = () => {
    setModalVisible(false);
    alert('Función para pagar con tokens (a implementar)');
  };

  const handleUnlockWithMoney = () => {
    setModalVisible(false);
    router.push('/../components/buyCoins/BuyCoinsScreen');
  };

  return (
    <>
      <LinearGradient
        colors={['#0a0f2c', '#1f103f', '#330d4e']}
        style={styles.gradientBackground}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => setModalVisible(true)}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.vipText}>Contenido VIP Exclusivo</Text>
            </View>
            <Text style={styles.description}>
              Desbloquea frases más calientes, historias intensas y juegos secretos solo para miembros VIP.
            </Text>
            <View style={styles.buttonRow}>
              <Text style={styles.ctaText}>Ver beneficios →</Text>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Modal VIP */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hazte VIP</Text>
            <Text style={styles.modalText}>✅ Accede a contenido sin censura</Text>
            <Text style={styles.modalText}>🔥 Frases y relatos ultra calientes</Text>
            <Text style={styles.modalText}>🎮 Juegos mentales y sexuales secretos</Text>

            <TouchableOpacity style={styles.tokenButton} onPress={handleUnlockWithTokens}>
              <Text style={styles.tokenText}>Desbloquear con 1 Token</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.moneyButton} onPress={handleUnlockWithMoney}>
              <Text style={styles.moneyText}>Desbloquear con Dinero 💳</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    width: width - 48,
  },
  gradientBackground: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12,
    elevation: 8,
  },
  cardContent: {
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vipText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F4F4F4',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 18,
  },
  buttonRow: {
    alignItems: 'flex-end',
  },
  ctaText: {
    color: '#ffcb00',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  tokenButton: {
    backgroundColor: '#ffcb00',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 20,
  },
  tokenText: {
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
  moneyButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  moneyText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  closeText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
});
