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
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const [role, setRole] = useState<'cliente' | 'creadora' | null>(null);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !role) {
      alert('Completa todos los campos y selecciona tu rol.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 🔥 Guardamos datos del usuario en Firestore
      await setDoc(doc(db, 'users', uid), {
        email,
        role,
        createdAt: new Date(),
      });

      alert(`Cuenta creada exitosamente como ${role.toUpperCase()}`);
      router.replace('/');
    } catch (err) {
      if (err instanceof Error) {
        alert('Error: ' + err.message);
      } else {
        alert('Ocurrió un error desconocido.');
      }
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

        <Text style={[styles.label, { marginTop: 12 }]}>Select Role</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === 'cliente' && styles.roleSelected,
            ]}
            onPress={() => setRole('cliente')}
          >
            <Text style={styles.roleText}>🔥 Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === 'creadora' && styles.roleSelected,
            ]}
            onPress={() => setRole('creadora')}
          >
            <Text style={styles.roleText}>💃 Creadora</Text>
          </TouchableOpacity>
        </View>

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
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
  },
  roleSelected: {
    backgroundColor: '#d80060',
    borderColor: '#d80060',
  },
  roleText: {
    color: '#000',
    fontWeight: 'bold',
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
