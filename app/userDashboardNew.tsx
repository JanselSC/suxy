import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

const { width } = Dimensions.get('window');
const PAYPAL_LINK = 'https://www.paypal.com/ncp/payment/5BFNHCAC44YMS';

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [tokens, setTokens] = useState<number | null>(null);
  const [historial, setHistorial] = useState<any[]>([]);
  const [creadorasSeguidas, setCreadorasSeguidas] = useState<any[]>([]);
  const [historiasDesbloqueadas, setHistoriasDesbloqueadas] = useState<any[]>([]);
  const [fotosDesbloqueadas, setFotosDesbloqueadas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userGenero = (user as any)?.genero || 'masculino';
  const tienePhotoURL = (user as any)?.photoURL?.startsWith('http');

  const avatarSource = tienePhotoURL
    ? { uri: (user as any).photoURL }
    : userGenero === 'femenino'
    ? require('../assets/images/femaleAvatar.png')
    : require('../assets/images/maleAvatar.png');

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const userRef = doc(db, 'usuarios', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTokens(data.tokens ?? 0);
          setHistorial(data.historial ? [...data.historial].reverse() : []);
          setCreadorasSeguidas(data.seguidas ?? []);
          setHistoriasDesbloqueadas(data.historias ?? []);
          setFotosDesbloqueadas(data.fotos ?? []);
        } else {
          setTokens(0);
          setHistorial([]);
          setCreadorasSeguidas([]);
          setHistoriasDesbloqueadas([]);
          setFotosDesbloqueadas([]);
        }
      } catch (err) {
        setTokens(0);
        setHistorial([]);
        setCreadorasSeguidas([]);
        setHistoriasDesbloqueadas([]);
        setFotosDesbloqueadas([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace('/');
    } catch (err) {
      alert('Error al cerrar sesión');
    }
  };

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <Image source={avatarSource} style={styles.profilePic} />

        <Text style={styles.welcome}>Bienvenido de nuevo,</Text>
        <Text style={styles.email}>{user?.displayName || user?.email}</Text>

        <View style={styles.tokenBox}>
          <Text style={styles.tokenAmount}>
            {tokens !== null ? tokens : <ActivityIndicator color="#FFD700" />}
            <Text style={styles.tokenIcon}> 🪙</Text>
          </Text>
          <Text style={styles.tokenLabel}>Tus tokens</Text>
        </View>

        <View style={styles.historialBox}>
          <Text style={styles.historialTitle}>Historial de movimientos</Text>
          {loading ? (
            <ActivityIndicator color="#FFD700" style={{ marginTop: 20 }} />
          ) : historial.length === 0 ? (
            <Text style={styles.noHistorial}>No tienes movimientos todavía.</Text>
          ) : (
            <FlatList
              data={historial}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={[styles.historialItem, item.tipo === 'compra' ? styles.compra : styles.gasto]}>
                  <Text style={styles.movTipo}>
                    {item.tipo === 'compra' ? 'Compra de tokens' : 'Gasto'}
                  </Text>
                  <Text style={styles.movCantidad}>
                    {item.tipo === 'compra' ? '+' : '-'}{item.cantidad} 🪙
                  </Text>
                  <Text style={styles.movFecha}>
                    {new Date(item.fecha).toLocaleDateString()} {new Date(item.fecha).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.movMetodo}>{item.metodo === 'paypal' ? 'PayPal' : item.motivo}</Text>
                </View>
              )}
              style={{ marginTop: 12, maxHeight: 300 }}
            />
          )}
        </View>

        <View style={styles.historialBox}>
          <Text style={styles.historialTitle}>👩 Creadoras que sigues</Text>
          {creadorasSeguidas.length === 0 ? (
            <Text style={styles.noHistorial}>No sigues a ninguna creadora todavía.</Text>
          ) : (
            <FlatList
              horizontal
              data={creadorasSeguidas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.creatorCard}>
                  <Image
                    source={{ uri: item.foto || 'https://i.imgur.com/An9ltcv.png' }}
                    style={styles.creatorImage}
                  />
                  <Text style={styles.creatorName}>{item.nombre}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.historialBox}>
          <View style={styles.storyTitleRow}>
            <Text style={styles.historialTitle}>📖 Historias desbloqueadas</Text>
            <Ionicons name="lock-closed-outline" style={styles.lockIcon} />
          </View>
          {historiasDesbloqueadas.length === 0 ? (
            <Text style={styles.noHistorial}>Aún no has desbloqueado ninguna historia.</Text>
          ) : (
            historiasDesbloqueadas.slice(0, 5).map((h, idx) => (
              <View key={idx} style={styles.storyCard}>
                <Text style={styles.storyTitle}>{h.titulo}</Text>
                <View style={styles.tagList}>
                  {h.tags?.map((tag: string, i: number) => (
                    <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                  ))}
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.historialBox}>
          <Text style={styles.historialTitle}>📸 Fotos VIP desbloqueadas</Text>
          {fotosDesbloqueadas.length === 0 ? (
            <Text style={styles.noHistorial}>No has desbloqueado fotos todavía.</Text>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {fotosDesbloqueadas.slice(0, 6).map((foto, idx) => (
                <Image key={idx} source={{ uri: foto.url }} style={styles.unlockedImage} />
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
  style={styles.rechargeBtn}
  onPress={() => WebBrowser.openBrowserAsync(PAYPAL_LINK)}
>
  <LinearGradient
    colors={['#FFD700', '#ff4c60']}
    style={styles.rechargeGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <Text style={styles.rechargeText}>💳 Recargar Tokens</Text>
  </LinearGradient>
</TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: 'center' },
  inner: { alignItems: 'center' },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 30,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  logo: { width: 140, height: 140, marginBottom: 20 },
  welcome: { fontSize: 22, color: '#fff', marginBottom: 8 },
  email: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 18 },
  tokenBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  tokenAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 2,
  },
  tokenIcon: { fontSize: 26, marginLeft: 6 },
  tokenLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  historialBox: {
    width: '100%',
    marginBottom: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 14,
  },
  historialTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  noHistorial: {
    color: '#aaa',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 16,
  },
  historialItem: {
    backgroundColor: 'rgba(255,255,255,0.19)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  compra: { borderLeftWidth: 4, borderLeftColor: '#46dd93' },
  gasto: { borderLeftWidth: 4, borderLeftColor: '#ff4c60' },
  movTipo: { fontSize: 15, fontWeight: '700', color: '#fff' },
  movCantidad: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 2,
  },
  movFecha: { color: '#bbb', fontSize: 13 },
  movMetodo: { fontSize: 13, color: '#89cdfa', marginTop: 2 },
  sectionBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    elevation: 2,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  noDataText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
  },
  creatorCard: { alignItems: 'center', marginRight: 14 },
  creatorImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 6 },
  creatorName: { color: '#fff', fontSize: 13, textAlign: 'center' },
  unlockedItem: { color: '#fff', fontSize: 14, marginVertical: 4 },
  unlockedImage: { width: 80, height: 80, borderRadius: 12 },
  logoutBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 28,
    width: width - 100,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: { color: '#1f103f', fontSize: 16, fontWeight: 'bold' },
  storyCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  storyTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  lockIcon: {
    color: '#d477f7',
    fontSize: 16,
    marginLeft: 6,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  tag: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 12.5,
  },
  rechargeBtn: {
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 20,
    width: width - 100,
  },
  rechargeGradient: {
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
  },
  rechargeText: {
    color: '#1f103f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

