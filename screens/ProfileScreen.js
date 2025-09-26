// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme';
import { SkillContext } from '../SkillContext';
import { useAuth } from '../AuthContext';

export default function ProfileScreen({ navigation }) {
  const { skills, deleteSkill, updateSkill } = useContext(SkillContext);
  const { user, logout, updateProfile } = useAuth();
  const mySkills = skills.filter((s) => s.ownerEmail === (user?.email || ''));

  const handleEditSkill = (skill) => {
    navigation.navigate('EditSkill', {
      skill,
      onSave: (updates) => updateSkill(skill.id, updates),
    });
  };

  const renderSkill = ({ item }) => (
    <View style={styles.skillCard}>
      <Text style={styles.skillTitle}>{item.title}</Text>
      <Text style={styles.skillCategory}>{item.desc}</Text>
      <View style={styles.row}>
        <View style={[styles.smallBtn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary }]}> 
          <Text style={[styles.smallBtnText, { color: colors.primary }]}>♥ {item.likeCount || 0}</Text>
        </View>
        <TouchableOpacity style={styles.smallBtn} onPress={() => handleEditSkill(item)}>
          <Text style={styles.smallBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallBtn, { backgroundColor: '#E74C3C' }]} onPress={() => deleteSkill(item.id)}>
          <Text style={[styles.smallBtnText, { color: '#fff' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: user?.photoUri || 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.avatarEditBtn}
            onPress={async () => {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Permission to access media library is required.');
                return;
              }
              const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
              });
              if (!res.canceled && res.assets && res.assets.length > 0) {
                updateProfile({ photoUri: res.assets[0].uri });
              }
            }}
          >
            <Text style={styles.avatarEditText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.subtitle}>{user?.email}</Text>
      </View>

      {/* Editable profile fields */}
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="City, Country"
            placeholderTextColor="#888"
            value={user?.location || ''}
            onChangeText={(t) => updateProfile({ location: t })}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Work</Text>
          <TextInput
            style={styles.input}
            placeholder="Where do you work?"
            placeholderTextColor="#888"
            value={user?.work || ''}
            onChangeText={(t) => updateProfile({ work: t })}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 90 }]}
            placeholder="Tell people about yourself"
            placeholderTextColor="#888"
            value={user?.bio || ''}
            onChangeText={(t) => updateProfile({ bio: t })}
            multiline
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com"
            placeholderTextColor="#888"
            value={user?.website || ''}
            onChangeText={(t) => updateProfile({ website: t })}
            autoCapitalize="none"
          />
        </View>

        {/* My Skills */}
        <Text style={styles.sectionTitle}>My Skills</Text>
        <FlatList
          data={mySkills}
          renderItem={renderSkill}
          keyExtractor={(item) => item.id}
        />

        {/* Logout at bottom */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout(); navigation.replace('Login'); }}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  avatarWrap: { position: 'relative', marginTop: 16, marginBottom: 16 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  avatarEditBtn: { position: 'absolute', right: -6, bottom: -6, backgroundColor: colors.primary, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14 },
  avatarEditText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  subtitle: { color: '#aaa', marginBottom: 10 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 15,
    marginBottom: 10,
  },
  skillCard: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  skillTitle: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  skillCategory: { color: '#aaa', marginTop: 5 },
  row: { flexDirection: 'row', gap: 10, marginTop: 10 },
  smallBtn: { backgroundColor: colors.primary, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  smallBtnText: { color: '#000', fontWeight: 'bold' },
  field: { marginHorizontal: 15, marginBottom: 12 },
  label: { color: '#aaa', marginBottom: 6 },
  input: { backgroundColor: colors.card, color: colors.text, padding: 12, borderRadius: 10 },
  logoutBtn: { alignSelf: 'center', marginTop: 20, backgroundColor: '#E74C3C', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});
