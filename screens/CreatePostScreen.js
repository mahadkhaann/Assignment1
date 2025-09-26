// screens/CreatePostScreen.js
import React, { useState, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkillContext } from '../SkillContext';
import { useAuth } from '../AuthContext';
import { colors } from '../theme';

export default function CreatePostScreen({ navigation }) {
  const { addSkill } = useContext(SkillContext);
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handlePost = () => {
    if (!title || !desc) {
      alert('Please fill in both fields');
      return;
    }

    const newSkill = { title, desc, ownerEmail: user?.email || 'unknown@example.com', likeCount: 0 };
    addSkill(newSkill);
    navigation.navigate('Home'); // go back to Home tab
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Offer a New Skill</Text>
      <TextInput
        placeholder="Skill Title"
        placeholderTextColor="#888"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Skill Description"
        placeholderTextColor="#888"
        style={[styles.input, { height: 100 }]}
        value={desc}
        onChangeText={setDesc}
        multiline
      />
      <TouchableOpacity style={styles.btn} onPress={handlePost}>
        <Text style={styles.btnText}>Post Skill</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 20 },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { fontWeight: 'bold', color: '#000' },
});
