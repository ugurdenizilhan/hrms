import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ handleLogout }) => {
  // Mock user data
  const user = {
    id: 1,
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    position: 'İK Müdürü',
    department: 'İnsan Kaynakları',
    hireDate: '2020-03-15',
    leaveBalance: 15,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={80} color="white" />
        </View>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.position}>{user.position}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={24} color="#1976d2" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>E-posta</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={24} color="#1976d2" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Telefon</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="business" size={24} color="#1976d2" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Departman</Text>
            <Text style={styles.infoValue}>{user.department}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="date-range" size={24} color="#1976d2" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>İşe Başlama Tarihi</Text>
            <Text style={styles.infoValue}>{formatDate(user.hireDate)}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="event-available" size={24} color="#1976d2" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Kalan İzin Günü</Text>
            <Text style={styles.infoValue}>{user.leaveBalance} gün</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="white" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1976d2',
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoSection: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 