// components/Creators/SelectUnlockLevels.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UnlockOption {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const OPTIONS: UnlockOption[] = [
  { key: 'text', label: 'Texto caliente', icon: 'document-text-outline' },
  { key: 'image', label: 'Foto HD', icon: 'image-outline' },
  { key: 'video', label: 'Video completo', icon: 'videocam-outline' },
  { key: 'audio', label: 'Audio hot', icon: 'mic-outline' },
];

interface Props {
  selected: string[];
  onChange: (updated: string[]) => void;
}

export default function SelectUnlockLevels({ selected, onChange }: Props) {
  const toggleOption = (key: string) => {
    if (selected.includes(key)) {
      onChange(selected.filter((item) => item !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  return (
    <View>
      <Text style={styles.title}>¿Qué se desbloquea cuando pagan?</Text>
      <FlatList
        data={OPTIONS}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.key);
          return (
            <TouchableOpacity
              onPress={() => toggleOption(item.key)}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isSelected ? '#fff' : '#999'}
              />
              <Text style={[styles.optionText, isSelected && { color: '#fff' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  option: {
    backgroundColor: '#2c2c2e',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#ff2d55',
  },
  optionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#aaa',
  },
});
