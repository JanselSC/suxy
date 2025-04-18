import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '@/AuthContext'; //  Verifica que este path esté bien

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth(); //  se obtiene del contexto

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName } = userCredential.user;

      console.log('[ LOGIN]', userCredential.user);

      setUser({
        uid,
        email: userEmail ?? '',
        displayName: displayName ?? '',
      });

      router.replace('./userDashboardNew');
    } catch (err: any) {
      alert('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.topTextBox}>
        <Text style={styles.hello}>Hello</Text>
        <Text style={styles.signIn}>Sign in!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gmail</Text>
        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => router.push('/forgotScreen')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <LinearGradient
            colors={['#d80060', '#1f103f']}
            style={styles.loginGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.loginText}>SIGN IN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.noAccount}>Don't have account?</Text>
          <TouchableOpacity onPress={() => router.push('/signupScreen')}>
            <Text style={styles.signupLink}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: '#1f103f',
  },
  topTextBox: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  hello: {
    fontSize: 58,
    color: '#fff',
    fontWeight: 'bold',
  },
  signIn: {
    fontSize: 44,
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
  },
  label: {
    fontSize: 24,
    color: '#d80060',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 26,
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#555',
    fontSize: 13,
    marginBottom: 30,
  },
  loginBtn: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  loginGradient: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  noAccount: {
    color: '#aaa',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#1f103f',
  },
});
