// components/Teasers/CategoriesTabs.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  active: string;
  onChange: (category: string) => void;
}

const categories = ['Nuevos', 'Fotos', 'Videos', 'Audios', 'Favoritos'];

export default function CategoriesTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onChange(cat)}
          style={[styles.tab, active === cat && styles.activeTab]}
        >
          <Text style={[styles.text, active === cat && styles.activeText]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#2c2c2e',
  },
  activeTab: {
    backgroundColor: '#ff2d55',
  },
  text: {
    color: '#aaa',
    fontSize: 14,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
