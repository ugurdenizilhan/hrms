import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authService, setAuthToken } from '@hrms/common';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import LoadingScreen from './src/screens/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setAuthToken(token);
          await authService.getCurrentUser();
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear token on error
        await AsyncStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          {isAuthenticated ? (
            <MainNavigator setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <AuthNavigator setIsAuthenticated={setIsAuthenticated} />
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 