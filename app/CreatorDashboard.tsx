import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/AuthContext'; // Asegúrate de tener este contexto
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Asegúrate de importar correctamente tu config de Firebase
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CreatorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [creatorData, setCreatorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!user) return;
  
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCreatorData(docSnap.data());
      }
      setLoading(false);
    };
  
    fetchCreatorData();
  }, [user]);
  
  if (loading || !creatorData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4c60" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1f103f', '#330d4e']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>
  Hola, {creatorData.name || user?.email || 'Creadora'}
</Text>
<Text style={styles.subtitle}>👛 Tokens disponibles: {creatorData.tokens || 0}</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <LinearGradient colors={['#ff4c60', '#FFD700']} style={styles.gradient}>
            <Text style={styles.buttonText}>📤 Subir Contenido</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
  <LinearGradient colors={['#00f260', '#0575e6']} style={styles.gradient}>
    <Text style={styles.buttonText}>📁 Ver Mis Contenidos</Text>
  </LinearGradient>
</TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <LinearGradient colors={['#4c68ff', '#6e45e2']} style={styles.gradient}>
            <Text style={styles.buttonText}>💰 Ver Ganancias</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.gradient}>
            <Text style={styles.buttonText}>🏦 Solicitar Retiro</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <LinearGradient colors={['#ff8a00', '#e52e71']} style={styles.gradient}>
            <Text style={styles.buttonText}>🎮 Crear Retos</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingVertical: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 30
  },
  button: {
    width: width * 0.8,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden'
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0f2c'
  }
});
