import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      alert('Completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Cuenta creada exitosamente ');
        router.replace('/');
      })
      .catch((err) => alert('Error: ' + err.message));
  };

  return (
    <LinearGradient
      colors={['#0a0f2c', '#1f103f', '#330d4e']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.topTextBox}>
        <Text style={styles.hello}>Create</Text>
        <Text style={styles.signIn}>Your Account</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gmail</Text>
        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
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

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
          <LinearGradient
            colors={['#d80060', '#1f103f']}
            style={styles.loginGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.loginText}>SIGN UP</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.noAccount}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/loginScreen')}>
            <Text style={styles.signupLink}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

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
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  signIn: {
    fontSize: 38,
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
