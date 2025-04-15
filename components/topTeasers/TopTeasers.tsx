// components/Teasers/TopTeasers.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

interface Teaser {
  id: string;
  mediaUrl: string;
  teaserText: string;
  unlockCount: number;
  price: number;
}

interface Props {
  topTeasers: Teaser[];
  onSelect: (teaser: Teaser) => void;
}

export default function TopTeasers({ topTeasers, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Lo más desbloqueado</Text>

      <FlatList
        data={topTeasers}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
            <Image source={{ uri: item.mediaUrl }} style={styles.image} blurRadius={12} />
            <View style={styles.overlay}>
              <Text style={styles.count}>🔓 {item.unlockCount}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  card: {
    width: 140,
    height: 200,
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: { color: '#fff', fontSize: 13 },
  price: { color: '#ff2d55', fontWeight: 'bold' },
});
