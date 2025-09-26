// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const skills = [
    'Web Development',
    'Mobile Apps',
    'Data Science',
    'Video Editing',
    'Public Speaking',
  ];

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔎 Search Bar */}
      <TextInput
        placeholder="Search skills..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.searchBar}
      />

      {/* 📜 Scrollable results */}
      <ScrollView>
        {filteredSkills.map((skill, index) => (
          <View key={index} style={styles.skillBox}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 15 },
  searchBar: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: colors.text,
  },
  skillBox: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  skillText: { color: colors.text, fontSize: 16 },
});
