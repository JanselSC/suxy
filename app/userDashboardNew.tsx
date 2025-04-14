import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig'

const { width } = Dimensions.get('window');

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace('/'); // Redirige al Home o AuthScreen
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
      <View style={styles.inner}>
        <Image
    source={require('@/assets/images/suxy_logo.png')}

          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcome}>Bienvenido de nuevo,</Text>
        <Text style={styles.email}>{user?.displayName || user?.email}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  logoutBtn: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 28,
    width: width - 100,
    alignItems: 'center',
  },
  logoutText: {
    color: '#1f103f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});