import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent', // Fondo transparente
            borderTopWidth: 0, // Eliminamos la línea superior de la tab bar
          },
          default: {
            backgroundColor: 'transparent',
          },
        }),
        tabBarBackground: () => (
          <LinearGradient
            colors={['#0a0f2c', '#1f103f', '#330d4e']} // Colores del gradiente
            style={styles.gradientBackground}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color} />,
        }}
      />writepe
      <Tabs.Screen
        name="Game"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />crowng
          <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="history-edu" color={color} />,
        }}
      />
                <Tabs.Screen
        name="vipCard"
        options={{
          title: 'Vip',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="crown-outline" color={color} />,
        }}
      />

<Tabs.Screen
        name="gameCard"
        options={{
          title: 'Game',
          tabBarIcon: ({ color }) => <Entypo size={28} name="game-controller" color={color} />,
        }}
      />

<Tabs.Screen
        name="writeStory"
        options={{
          title: 'Write Story',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="notebook-edit" color={color} />,
        }}
      />
      <Tabs.Screen
        name="autScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, // Aseguramos que el gradiente ocupe toda la barra
    position: 'absolute', // Necesario para que se muestre correctamente
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
