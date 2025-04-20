import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Linking, Alert } from 'react-native';
import { useCoins } from '../coin/CoinContext';

const coinPacks = [
  { id: '1', coins: 100, price: 0.99 },
  { id: '2', coins: 300, price: 2.49 },
  { id: '3', coins: 500, price: 3.99 },
  { id: '4', coins: 1000, price: 6.99 },
];

const PAYPAL_LINK = 'https://www.paypal.com/ncp/payment/5BFNHCAC44YMS';

export default function BuyCoinsScreen() {
  const { addCoins } = useCoins();

  const handleBuy = (coins: number) => {
    // Abrir enlace de PayPal
    Linking.openURL(PAYPAL_LINK)
      .then(() => {
        // Simulación (MVP)
        addCoins(coins);
        Alert.alert('¡Éxito!', `Se añadieron ${coins} monedas (modo prueba MVP)`);
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudo abrir el enlace de pago');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compra monedas 🔥</Text>

      <FlatList
        data={coinPacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pack}
            onPress={() => handleBuy(item.coins)}
          >
            <Text style={styles.coins}>{item.coins} monedas</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  pack: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coins: { color: '#fff', fontSize: 16 },
  price: { color: '#aaa', fontSize: 16 },
});
