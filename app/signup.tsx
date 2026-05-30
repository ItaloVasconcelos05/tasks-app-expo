import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const signup = useAuthStore((state) => state.signup);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, insira seu nome.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, insira uma senha.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signup(name, email, password);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Não foi possível criar a conta. Este e-mail já pode estar registado.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name.trim() && email.trim() && password.trim() && password.length >= 6 && validateEmail(email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (mín. 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, !isFormValid && styles.buttonDisabled]} 
        onPress={handleSignup} 
        disabled={loading || !isFormValid}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registar</Text>}
      </TouchableOpacity>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Já tem conta? Entre aqui.</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#666', fontSize: 14 }
});