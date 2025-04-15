// components/Creators/MyEarnings.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyEarnings() {
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // En MVP: Carga simulada
    const generated = 45.75; // Aquí conectarás con Firestore en el futuro
    setEarnings(generated);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus ganancias 💰</Text>
      <Text style={styles.amount}>${earnings.toFixed(2)} USD</Text>
      <Text style={styles.info}>Actualizado automáticamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 36,
    color: '#00ff95',
    marginVertical: 10,
  },
  info: {
    color: '#aaa',
    fontSize: 13,
  },
});
