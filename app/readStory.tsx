import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReadStory() {
  const { title, content, tags } = useLocalSearchParams();

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.story}>{content}</Text>
        <View style={styles.tagContainer}>
          {tags?.toString().split(',').map((tag, index) => (
            <Text key={index} style={styles.tag}>{tag.trim()}</Text>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  content: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
  },
  story: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 24,
    marginBottom: 40,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#222',
    color: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
  },
});
