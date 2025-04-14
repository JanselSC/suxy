import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      alert('Ingresa tu correo electrónico.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Revisa tu correo 📩', 'Hemos enviado instrucciones para restablecer tu contraseña.');
      router.push('/loginScreen');
    } catch (error: any) {
      alert('Error: ' + error.message);
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
        <Text style={styles.hello}>Forgot</Text>
        <Text style={styles.signIn}>Password?</Text>
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

        <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
          <LinearGradient
            colors={['#d80060', '#1f103f']}
            style={styles.loginGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.loginText}>ENVIAR INSTRUCCIONES</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/loginScreen')} style={{ alignSelf: 'center' }}>
          <Text style={styles.signupLink}>Volver al login</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
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
  signupLink: {
    fontWeight: 'bold',
    color: '#1f103f',
    fontSize: 14,
    marginTop: 10,
  },
});
