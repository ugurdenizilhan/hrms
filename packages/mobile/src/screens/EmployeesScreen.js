import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockEmployees = [
  { id: '1', firstName: 'Ahmet', lastName: 'Yılmaz', position: 'İK Müdürü', department: 'İnsan Kaynakları' },
  { id: '2', firstName: 'Ayşe', lastName: 'Demir', position: 'Yazılım Geliştirici', department: 'Bilgi Teknolojileri' },
  { id: '3', firstName: 'Mehmet', lastName: 'Kaya', position: 'Muhasebe Uzmanı', department: 'Finans' },
  { id: '4', firstName: 'Zeynep', lastName: 'Şahin', position: 'Pazarlama Uzmanı', department: 'Pazarlama' },
  { id: '5', firstName: 'Mustafa', lastName: 'Çelik', position: 'Satış Temsilcisi', department: 'Satış' },
];

const EmployeesScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.employeeCard}>
      <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.employeeDetail}>{item.position}</Text>
      <Text style={styles.employeeDetail}>{item.department}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEmployees}
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
  employeeCard: {
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
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  employeeDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default EmployeesScreen; 