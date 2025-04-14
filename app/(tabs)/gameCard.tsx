import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface GameCardProps {
  title: string;
  description: string;
  onPlay?: () => void;
}

export default function GameCard({ title, description, onPlay }: GameCardProps) {
  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']} // Colores del gradiente
      style={styles.gradientBackground}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPlay}>
        {/* Fondo transparente con gradiente */}
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}  Juego Sexy del Día</Text>
            <Text style={styles.icon}></Text>
          </View>
          <Text style={styles.description}>Desafíos atrevidos que solo los valientes se atreven a jugar.</Text>
          <View style={styles.buttonRow}>
            <Text style={styles.playText}>Jugar ahora </Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent', // Fondo transparente para que se vea el gradiente
    borderRadius: 24,
    padding: 0, // Quitamos el padding para evitar el espacio innecesario
    width: width - 48,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20,
    elevation: 12,
    position: 'relative', // Aseguramos que se pueda apilar encima de otros elementos
  },
  gradientBackground: {
    flex: 1, // Asegúrate de que el gradiente ocupe toda la tarjeta
    padding: 24, // Aseguramos que haya espacio dentro de la tarjeta
    justifyContent: 'center', // Centra el contenido dentro del gradiente
    backgroundColor: 'rgba(0,0,0,0.5)', // Añadimos una capa semi-transparente para mejorar el contraste
  },
  cardContent: {
    position: 'relative', // El contenido se posiciona encima del gradiente
    zIndex: 1, // Aseguramos que esté encima del gradiente
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F4F4F4', // Blanco brillante para el título
  },
  icon: {
    fontSize: 24,
    color: '#00e0ff', // Resalta el icono con un color brillante
  },
  description: {
    color: '#F4F4F4', // Blanco brillante para la descripción
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  buttonRow: {
    alignItems: 'flex-end',
  },
  playText: {
    color: '#ff338a', // Color para el texto de acción, resalta con un color brillante
    fontSize: 16,
    fontWeight: '600',
  },
});
