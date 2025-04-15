import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { getStories, Story } from '../../firestore';
import rawDemoStories from '../../demo_stories_100.json';
import { Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const PAGE_SIZE = 10;

const demoStories: Story[] = rawDemoStories.map((story, index) => ({
  ...story,
  id: `demo-${index}`,
  createdAt: Timestamp.now(),
}));

export default function HistoriasScreen() {
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [visibleStories, setVisibleStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showLocked, setShowLocked] = useState<'all' | 'locked' | 'unlocked'>('all');

  const getLocalStories = async (): Promise<Story[]> => {
    try {
      const local = await AsyncStorage.getItem('localStories');
      return local ? JSON.parse(local) : [];
    } catch (error) {
      return [];
    }
  };

  const applyFilters = (all: Story[], tag: string | null): Story[] => {
    let filtered = tag ? all.filter(story => story.tags.includes(tag)) : all;
    if (showLocked === 'locked') filtered = filtered.filter(story => story.locked);
    if (showLocked === 'unlocked') filtered = filtered.filter(story => !story.locked);
    return filtered;
  };

  const loadMoreStories = () => {
    const filtered = applyFilters(allStories, selectedTag);
    const start = (page - 1) * PAGE_SIZE;
    const nextPage = filtered.slice(start, start + PAGE_SIZE);
    setVisibleStories(nextPage);
  };

  const fetchStories = async () => {
    try {
      const [remote, local] = await Promise.all([getStories(), getLocalStories()]);
      const combined = [...local, ...remote];
      if (combined.length > 0) {
        setAllStories(combined);
      } else {
        setAllStories(demoStories);
      }
    } catch {
      setAllStories(demoStories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    setPage(1);
    setVisibleStories([]);
  }, [selectedTag, showLocked]);

  useEffect(() => {
    loadMoreStories();
  }, [allStories, page, selectedTag, showLocked]);

  const tags = Array.from(new Set(allStories.flatMap(story => story.tags)));

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      disabled={item.locked}
      onPress={() =>
        router.push({
          pathname: '/readStory',
          params: {
            title: item.title,
            content: item.content,
            tags: item.tags.join(','),
          },
        })
      }
    >
      <LinearGradient
        colors={['#1c0045', '#3d0072']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.locked && <Ionicons name="lock-closed" size={16} color="#ff66cc" />}
        </View>
        <View style={styles.cardTags}>
          {item.tags?.map((tag, index) => (
            <Text key={index} style={styles.tagPill}>{tag}</Text>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.header}>Historias Anónimas</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 5 }}>
        {[null, ...tags].map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tag, selectedTag === tag && styles.tagSelected]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text style={[styles.tagText, selectedTag === tag && styles.tagTextSelected]}>
              {tag || 'Todas'}
            </Text>
          </TouchableOpacity>
        ))}
        {['unlocked', 'locked'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.tag, showLocked === type && styles.tagSelected]}
            onPress={() => setShowLocked(type as 'locked' | 'unlocked')}
          >
            <Text style={[styles.tagText, showLocked === type && styles.tagTextSelected]}>
              {type === 'locked' ? 'Bloqueadas' : 'Desbloqueadas'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={visibleStories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={() => setPage((prev) => Math.max(1, prev - 1))} style={styles.pageBtn}>
          <Text style={styles.pageBtnText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', paddingHorizontal: 16 }}>Página {page}</Text>
        <TouchableOpacity onPress={() => setPage((prev) => prev + 1)} style={styles.pageBtn}>
          <Text style={styles.pageBtnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    color: '#F4F4F4',
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
    width: width - 48,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  tagPill: {
    backgroundColor: '#111',
    color: '#aaa',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#222',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: '#ff338a',
  },
  tagText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  tagTextSelected: {
    color: '#fff',
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
  pageBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  pageBtnText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
