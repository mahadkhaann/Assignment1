// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkillContext } from '../SkillContext';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const { skills, likeSkill } = useContext(SkillContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔝 Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.offerBtn}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.topBtnText}>+ Offer Skill</Text>
        </TouchableOpacity>
      </View>

      {/* 📜 Scrollable list */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.card}>
            <View style={styles.cardText}>
              <Text style={styles.skillTitle}>{skill.title}</Text>
              <Text style={styles.skillDesc}>{skill.desc}</Text>
              <View style={styles.likesRow}>
                <TouchableOpacity style={styles.likeBtn} onPress={() => likeSkill(skill.id)}>
                  <Text style={styles.likeText}>♥ Like</Text>
                </TouchableOpacity>
                <Text style={styles.likeCount}>{skill.likeCount || 0}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() => navigation.navigate('SkillDetail', { skill })}
            >
              <Text style={styles.detailsText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 10 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  offerBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  topBtnText: { color: '#000', fontWeight: 'bold' },
  scrollContainer: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
  },
  cardText: { flex: 1, marginRight: 10 },
  skillTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  skillDesc: { fontSize: 14, color: '#aaa', marginTop: 4 },
  detailsBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
  likesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 10 },
  likeBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  likeText: { color: colors.primary, fontWeight: 'bold' },
  likeCount: { color: '#aaa' },
});
