// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { useAuth } from '../AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, demo } = useAuth();

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter email and password');
      return;
    }
    const ok = login(email.trim(), password.trim());
    if (ok) navigation.replace('Main');
    else alert('Invalid credentials. Use Demo or a created account.');
  };

  const handleDemoLogin = () => {
    setEmail(demo.email);
    setPassword(demo.password);
    const ok = login(demo.email, demo.password);
    if (ok) navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SkillSwap </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.demoButton} onPress={handleDemoLogin}>
        <Text style={styles.demoText}>Demo Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
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
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  demoButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  demoText: { color: colors.primary, fontWeight: 'bold', fontSize: 16 },
  signupText: { color: colors.primary, marginTop: 15 },
});
