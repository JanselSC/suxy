// components/Creators/ReferralLink.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

interface Props {
  username: string;
}

export default function ReferralLink({ username }: Props) {
  const referralUrl = `https://suxy.app/r/${username}`;

  const shareLink = async () => {
    await Share.share({
      message: `🔥 Mira mis teasers en SUXY 🔓\n${referralUrl}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tu enlace de promoción:</Text>
      <Text style={styles.link}>{referralUrl}</Text>

      <TouchableOpacity style={styles.button} onPress={shareLink}>
        <Text style={styles.buttonText}>Compartir link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#1c1c1e', borderRadius: 12 },
  label: { color: '#fff', marginBottom: 6 },
  link: { color: '#00bfff', marginBottom: 12 },
  button: {
    backgroundColor: '#ff2d55',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
