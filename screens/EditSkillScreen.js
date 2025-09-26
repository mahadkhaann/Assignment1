// screens/EditSkillScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function EditSkillScreen({ route, navigation }) {
  const { skill, onSave } = route.params;
  const [title, setTitle] = useState(skill.title);
  const [desc, setDesc] = useState(skill.desc);

  const handleSave = () => {
    if (!title || !desc) {
      alert('Please fill in both fields');
      return;
    }
    onSave({ title, desc });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Skill</Text>
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
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
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


