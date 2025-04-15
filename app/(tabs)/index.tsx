import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Share,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import phrases from '@/suxy_phrases_2000.json';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { getStories, Story } from '@/firestore'; // asegúrate que este es el correcto
import rawDemoStories from '@/demo_stories_100.json';
import { Timestamp } from 'firebase/firestore';
import {
  TeaserCard,
  UnlockModal,
  UnlockedContent,
  TopTeasers,
  CategoriesTabs
} from '@/components';


interface UnlockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmUnlock: () => void;
  unlockPrompt: string;
  price: number;
  onUnlock?: () => void; // ✅ hacerlo opcional
}


export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const [selectedTeaser, setSelectedTeaser] = useState<any | null>(null);
  const [unlockedTeaser, setUnlockedTeaser] = useState<any | null>(null);
  const [latestStories, setLatestStories] = useState<Story[]>([]);

  const getFromAsync = async (): Promise<Story[]> => {
    const stored = await AsyncStorage.getItem('localStories');
    const parsed: Story[] = stored ? JSON.parse(stored) : [];
    return parsed;
  };

  const getFromJson = (): Story[] => {
    return rawDemoStories.map((story, index) => ({
      ...story,
      id: `demo-${index}`,
      createdAt: Timestamp.now(), // ✅ usa el Timestamp real
    }));
  };
  
  const getFromFirebase = async (): Promise<Story[]> => {
    const data = await getStories();
    return data || [];
  };

  const fetchRandomSource = async () => {
    try {
      const sources = ['async', 'json', 'firebase'];
      const random = sources[Math.floor(Math.random() * sources.length)];
  
      let stories: Story[] = [];
  
      if (random === 'async') {
        const fromAsync = await getFromAsync();
        if (fromAsync.length) stories = fromAsync;
      }
  
      if (!stories.length && random === 'firebase') {
        const fromFirebase = await getFromFirebase();
        if (fromFirebase.length) stories = fromFirebase;
      }
  
      if (!stories.length) {
        stories = getFromJson();
      }
  
      if (!stories.length) {
        setLatestStories([]); // fallback visible
        return;
      }
  
      const sorted = stories.sort((a: Story, b: Story) => b.createdAt?.seconds - a.createdAt?.seconds);
      setLatestStories(sorted.slice(0, 2));
    } catch (error) {
      console.error('Error al cargar historias:', error);
      setLatestStories([]);
    }
  };
  
  const teaserList = [
    {
      id: 't1',
      teaserText: '¿Te atreves a ver lo que tengo puesto debajo?',
      unlockPrompt: 'Adivina o desbloquea para ver mi foto completa...',
      thumbnailUrl: 'https://i.imgur.com/KwPYoOQ.jpeg',
      mediaUrl: 'https://i.imgur.com/KwPYoOQ.jpeg',
      type: 'image',
      price: 0.99,
      unlockCount: 36,
    },
    {
      id: 't2',
      teaserText: 'Solo te muestro el video si puedes desbloquearlo 🔥',
      unlockPrompt: '3 segundos no son suficientes... ¿pagas por el resto?',
      thumbnailUrl: 'https://i.imgur.com/IXLmZkD.png',
      mediaUrl: 'https://i.imgur.com/IXLmZkD.png',
      type: 'video',
      price: 2.49,
      unlockCount: 64,
    },
  ];
  useFocusEffect(
    useCallback(() => {
      fetchRandomSource();
    }, [])
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: ` Frase del día en SUXY:\n"${randomPhrase.text}" \nDescúbrelo tú también.`,
      });
    } catch {
      alert('Error al compartir.');
    }
  };

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.background}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={[styles.container, { minHeight: 720 }]} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Animatable.View animation="fadeInDown" delay={200}>
          <Text style={[styles.title, isSmallScreen && { fontSize: 26 }]}>
            Bienvenido a <Text style={styles.highlight}>SUXY</Text>
          </Text>
          <Text style={[styles.subtitle, isSmallScreen && { fontSize: 13 }]}>
            Historias calientes, frases atrevidas y juegos para provocar tus sentidos.
          </Text>
        </Animatable.View>

        {/* FRASE DEL DÍA */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitleFrase}> Frase del Día</Text>
            <TouchableOpacity onPress={handleShare}>
              <AntDesign name="sharealt" size={18} color="#ffffffcc" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.cardText}>"{randomPhrase.text}"</Text>
          </View>
        </Animatable.View>

        {/* JUEGO SEXY */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.card}>
          <Text style={styles.cardTitleCenter}>Juego Sexy del Día</Text>
          <TouchableOpacity
            onPress={() => router.push("/gameCard")}
            style={styles.gameCard}
            activeOpacity={0.85}
          >
            <Text style={styles.gameTitle}>¿Te atreves?</Text>
            <Text style={styles.gameDesc}>
              Desafíos provocativos que pondrán a prueba tus límites más oscuros.
            </Text>
            <Text style={styles.gameCTA}> Jugar ahora</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* HISTORIAS ANÓNIMAS */}
        <Animatable.View animation="fadeInUp" delay={800} style={styles.card}>
          <Text style={styles.cardTitle}> Historias Anónimas</Text>
          <View style={styles.innerCardStack}>
            {latestStories.map((story) => (
              <TouchableOpacity
                key={story.id}
                onPress={() => router.push("/history")}
                style={styles.storyCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#0a0f2c', '#1f103f', '#330d4e']}
                  style={styles.gradientBackground}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.storyTitle}>{story.title}</Text>
                      {story.locked && (
                        <AntDesign name="lock" size={16} color="#ff66cc" />
                      )}
                    </View>
                    <View style={styles.storyTags}>
                      {story.tags?.map((tag: string, index: number) => (
                        <Text key={index} style={styles.tag}>{tag}</Text>
                      ))}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* VIP */}
        <Animatable.View animation="fadeInUp" delay={1000} style={styles.card}>
          <Text style={styles.cardTitle}> Contenido VIP</Text>
          <TouchableOpacity
            onPress={() => router.push("/vipCard")}
            style={styles.vipCard}
            activeOpacity={0.85}
          >
            <Text style={styles.vipTitle}> Contenido VIP Exclusivo</Text>
            <Text style={styles.vipDesc}>
              Desbloquea frases calientes, historias intensas y juegos secretos solo para miembros VIP.
            </Text>
            <Text style={styles.vipCTA}> Ver beneficios</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* DESBLOQUEA O ATRÉVETE */}
<Animatable.View animation="fadeInUp" delay={1200} style={styles.card}>
  <Text style={styles.cardTitleCenter}>Desbloquea o Atrévete 🔓</Text>

  <CategoriesTabs active="Nuevos" onChange={() => {}} />

  <TopTeasers topTeasers={teaserList} onSelect={setSelectedTeaser} />

  <View style={{ marginTop: 16 }}>
    {teaserList.map((t) => (
      <TeaserCard key={t.id} teaser={t} onUnlock={setSelectedTeaser} />
    ))}
  </View>
</Animatable.View>
{/* MODAL PARA DESBLOQUEAR */}
{selectedTeaser && (
  <UnlockModal
  visible={!!selectedTeaser}
  onClose={() => setSelectedTeaser(null)}
  unlockPrompt={selectedTeaser.unlockPrompt}
  price={selectedTeaser.price}
  onConfirmUnlock={() => {
    setUnlockedTeaser(selectedTeaser);
    setSelectedTeaser(null);
  }}
  onUnlock={() => {
    console.log('desbloqueado'); // ✅ lo que sea que quieras hacer
  }}
/>

)}

{/* CONTENIDO DESBLOQUEADO */}
{unlockedTeaser && (
  <UnlockedContent
    mediaUrl={unlockedTeaser.mediaUrl}
    contentType={unlockedTeaser.type}
    caption={unlockedTeaser.teaserText}
    onClose={() => setUnlockedTeaser(null)}
  />
)}

      </ScrollView>
    </LinearGradient>
  );
}

// Usa tus estilos anteriores sin cambios

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 28,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
  cardTitleFrase:{
marginBottom:10,
fontWeight: '900',
color: '#fff',
fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    maxWidth: 380,
  },
  highlight: {
    color: '#ffb6ff',
  },
  subtitle: {
    fontSize: 15,
    color: '#cfcfe0',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    maxWidth: 360,
  },
  card: {
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -10,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 15.5,
    fontWeight: '700',
    marginTop: -20,
  },
  cardTitleCenter: {
    color: '#ffffff',
    fontSize: 17.5,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  gameCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 18,
    gap: 6,
  },
  gameTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#fff',
  },
  gameDesc: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
  },
  gameCTA: {
    color: '#ff66cc',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
  },
  innerCardStack: {
    gap: 12,
    marginTop: 12,
  },
  storyCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    elevation: 8,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12,
  },
  cardContent: {
    position: 'relative',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4F4F4',
  },
  storyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#222',
    color: '#aaa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 13.5,
    marginRight: 6,
    marginBottom: 6,
  },
  vipCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 18,
    gap: 6,
  },
  vipTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#fff',
  },
  vipDesc: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
  },
  vipCTA: {
    color: '#ffd700',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 8,
  },
});
