import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockDepartments = [
  { id: '1', name: 'İnsan Kaynakları', managerName: 'Ahmet Yılmaz', employeeCount: 12 },
  { id: '2', name: 'Bilgi Teknolojileri', managerName: 'Mehmet Demir', employeeCount: 28 },
  { id: '3', name: 'Finans', managerName: 'Ayşe Kaya', employeeCount: 15 },
  { id: '4', name: 'Pazarlama', managerName: 'Ali Şahin', employeeCount: 10 },
  { id: '5', name: 'Satış', managerName: 'Zeynep Çelik', employeeCount: 22 },
];

const DepartmentsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.departmentCard}>
      <Text style={styles.departmentName}>{item.name}</Text>
      <Text style={styles.departmentDetail}>Yönetici: {item.managerName}</Text>
      <Text style={styles.departmentDetail}>Çalışan Sayısı: {item.employeeCount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockDepartments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  departmentCard: {
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
  departmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  departmentDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default DepartmentsScreen; 