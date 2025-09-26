// screens/SkillDetailScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function SkillDetailScreen({ route }) {
  const { skill } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{skill.title}</Text>
      <Text style={styles.desc}>{skill.desc}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  desc: { fontSize: 16, color: '#ccc', lineHeight: 22 },
});


