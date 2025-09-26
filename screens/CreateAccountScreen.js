// screens/CreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useAuth } from '../AuthContext';

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setCreatedAccount, login } = useAuth();

  const handleCreateAccount = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setCreatedAccount({ name: name.trim(), email: email.trim(), password: password.trim() });
    const ok = login(email.trim(), password.trim());
    if (ok) navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
        <Text style={styles.createText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginLink}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 30 },
  input: {
    width: '100%',
    backgroundColor: colors.card,
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  createText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  loginLink: { color: colors.primary, marginTop: 15 },
});


