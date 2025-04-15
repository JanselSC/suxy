// components/Creators/CreatorProfile.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

interface Teaser {
  id: string;
  mediaUrl: string;
  teaserText: string;
  type: 'image' | 'video';
  unlockCount: number;
  price: number;
}

interface Props {
  teasers: Teaser[];
  creatorName: string;
  onSelect: (teaser: Teaser) => void;
}

export default function CreatorProfile({ teasers, creatorName, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil de {creatorName}</Text>

      <FlatList
        data={teasers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
            <Image
              source={{ uri: item.mediaUrl }}
              style={styles.image}
              blurRadius={10}
            />
            <View style={styles.info}>
              <Text style={styles.text}>{item.teaserText}</Text>
              <Text style={styles.meta}>${item.price} | 🔓 {item.unlockCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1c1c1e',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  info: {
    padding: 12,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  meta: {
    color: '#aaa',
    fontSize: 13,
  },
});
