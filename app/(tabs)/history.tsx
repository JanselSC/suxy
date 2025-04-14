import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const mockStories = [
  { id: '1', title: 'Una noche en el ascensor', tags: ['+18', 'Real'], locked: false },
  { id: '2', title: 'Mi fantasía con mi mejor amiga', tags: ['Fantasía', 'Anónimo'], locked: true },
  { id: '3', title: 'Lo que hice en la playa', tags: ['+18', 'Confesión'], locked: false },
  { id: '4', title: 'Cuando me grabaron sin saberlo', tags: ['Secreto', 'Real'], locked: true },
];

interface Story {
  id: string;
  title: string;
  tags: string[];
  locked: boolean;
}

export default function HistoriasScreen() {
  const [stories] = useState<Story[]>(mockStories);

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.storyCard} disabled={item.locked}>
      {/* Linear Gradient applied to the card background */}
      <LinearGradient
        colors={['#0a0f2c', '#1f103f', '#330d4e']} // Colors of the gradient
        style={styles.gradientBackground}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.storyTitle}>{item.title}</Text>
            {item.locked && <Text style={styles.locked}></Text>}
          </View>
          <View style={styles.tagContainer}>
            {item.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']} // Colors of the background gradient
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.header}>Historias Anónimas</Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.writeBtn} onPress={() => router.push('/writeStory')}>
        <Text style={styles.writeText}> Escribir historia</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 30,
    color: '#F4F4F4',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  flatListContent: {
    paddingBottom: 80, // Extra space at the bottom for the write button
  },
  storyCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    width: width - 48,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
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
  storyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4F4F4',
  },
  locked: {
    color: '#ff338a',
    fontSize: 18,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#222',
    color: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 14,
    marginRight: 6,
    marginBottom: 6,
  },
  writeBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  writeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
