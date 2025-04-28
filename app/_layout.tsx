import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { CoinProvider } from '@/components/coin/CoinContext'; 
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/AuthContext'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebaseConfig'; // 🔥 Agrega firebase auth config

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function SessionManager() {
  const { setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          displayName: firebaseUser.displayName ?? '',
        });
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  return null; // No renderiza nada visible
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <CoinProvider>
          {/* 🔥 Manejador de sesión global */}
          <SessionManager /> 

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CoinProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
