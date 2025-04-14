import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

interface StoryCardProps {
  title: string;
  tags: string[];
  locked?: boolean;
  onPress?: () => void;
}

export default function StoryCard({ title, tags, locked = false, onPress }: StoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, locked && styles.lockedStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.storyTitle}>{title}</Text>
        {locked && <Text style={styles.lockedIcon}>🔒</Text>}
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 26,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 10,
  },
  lockedStyle: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyTitle: {
    color: '#F0F0F0',
    fontSize: 18,
    fontWeight: '600',
  },
  lockedIcon: {
    fontSize: 18,
    color: '#ff4081',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#222',
    color: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
  },
});
