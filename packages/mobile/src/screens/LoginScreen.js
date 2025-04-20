import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseAuthService } from '@hrms/common';

const LoginScreen = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen email ve şifrenizi girin');
      return;
    }

    setIsLoading(true);
    try {
      // Firebase login denemesi
      try {
        // Firebase ile giriş dene
        await firebaseAuthService.login(email, password);
        // Başarılı olursa burada devam edecek
        const mockToken = 'firebase-auth-token';
        await AsyncStorage.setItem('token', mockToken);
        setIsAuthenticated(true);
      } catch (firebaseError) {
        console.log('Firebase login hatası, mock veri kullanılıyor:', firebaseError);
        
        // Firebase başarısız olursa mock login kullan
        if (email === 'admin@example.com' && password === 'admin123') {
          // Başarılı giriş
          const mockToken = 'mock-jwt-token-12345';
          await AsyncStorage.setItem('token', mockToken);
          
          // Mock user bilgilerini localStorage'a kaydedelim
          const mockUser = {
            id: 1,
            firstName: 'Ahmet',
            lastName: 'Yılmaz',
            email: 'admin@example.com',
            role: 'ADMIN'
          };
          await AsyncStorage.setItem('user', JSON.stringify(mockUser));
          
          setIsAuthenticated(true);
        } else {
          // Başarısız giriş
          Alert.alert('Giriş Hatası', 'Email veya şifre hatalı. Lütfen tekrar deneyin.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Giriş Hatası', 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>HRMS</Text>
          <Text style={styles.subtitle}>İnsan Kaynakları Yönetim Sistemi</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          
          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
          
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          >
            Giriş Yap
          </Button>
          
          <Text style={styles.helpText}>
            Giriş bilgileri: admin@example.com / admin123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 6,
    backgroundColor: '#1976d2',
  },
  helpText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});

export default LoginScreen; 