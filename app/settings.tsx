import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function SettingsScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            logout();
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileTitle}>Perfil</Text>
        {user && (
          <>
            <View style={styles.profileInfo}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{user.name || 'N/A'}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.label}>E-mail:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Configurações</Text>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>Tasks App v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  profileInfo: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  appInfoText: {
    color: '#999',
    fontSize: 12,
  },
});
