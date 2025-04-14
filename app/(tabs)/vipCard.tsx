import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface VIPCardProps {
  onPress?: () => void;
}

export default function VIPCard({ onPress }: VIPCardProps) {
  return (
    <LinearGradient
    colors={['#0a0f2c', '#1f103f', '#330d4e']} // Gradient colors for the VIP card
    style={styles.gradientBackground}
    start={{ x: 0.2, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      {/* Gradient applied to VIP card background */}

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.vipText}> Contenido VIP Exclusivo</Text>
            <Text style={styles.icon}></Text>
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
    color: '#F4F4F4', // White text for the title
  },
  icon: {
    fontSize: 22,
    color: '#ffcb00', // Yellow for the icon
  },
  description: {
    fontSize: 14,
    color: '#ccc', // Light grey for the description text
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
});
