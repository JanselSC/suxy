import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/AuthContext';
import UserDashboardNew from '../userDashboardNew';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const router = useRouter();
  const { user } = useAuth();
  console.log('[ user en authScreen]:', user);
  

  if (user) {
    return <UserDashboardNew />;
  }

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

        <Text style={styles.title}>Welcome Back</Text>

        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => router.push('/loginScreen')}
        >
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => router.push('/signupScreen')}
        >
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>

        <Text style={styles.socialText}>Login with Social Media</Text>
      </View>
    </LinearGradient>
  );
};

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
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 48,
    textAlign: 'center',
  },
  signInBtn: {
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 28,
    paddingVertical: 14,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpBtn: {
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 14,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 32,
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 14,
  },
});
