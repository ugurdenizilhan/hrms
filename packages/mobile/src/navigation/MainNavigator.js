import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { authService } from '@hrms/common';

// Doğrudan import
import DashboardScreen from '../screens/DashboardScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import LeaveRequestsScreen from '../screens/LeaveRequestsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ setIsAuthenticated }) => {
  const handleLogout = async () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Employees') {
            iconName = 'people';
          } else if (route.name === 'Departments') {
            iconName = 'business';
          } else if (route.name === 'LeaveRequests') {
            iconName = 'event-note';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: 'Ana Sayfa' }}
      />
      <Tab.Screen 
        name="Employees" 
        component={EmployeesScreen} 
        options={{ title: 'Çalışanlar' }}
      />
      <Tab.Screen 
        name="Departments" 
        component={DepartmentsScreen} 
        options={{ title: 'Departmanlar' }}
      />
      <Tab.Screen 
        name="LeaveRequests" 
        component={LeaveRequestsScreen} 
        options={{ title: 'İzin Talepleri' }}
      />
      <Tab.Screen 
        name="Profile" 
        options={{ title: 'Profil' }}
      >
        {props => <ProfileScreen {...props} handleLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainNavigator; 