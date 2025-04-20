import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockLeaveRequests = [
  { id: '1', employeeName: 'Mehmet Kaya', startDate: '2023-06-10', endDate: '2023-06-15', status: 'Onaylandı', type: 'Yıllık İzin' },
  { id: '2', employeeName: 'Zeynep Şahin', startDate: '2023-07-01', endDate: '2023-07-05', status: 'Beklemede', type: 'Yıllık İzin' },
  { id: '3', employeeName: 'Ali Yıldız', startDate: '2023-06-20', endDate: '2023-06-22', status: 'Reddedildi', type: 'Mazeret İzni' },
  { id: '4', employeeName: 'Ayşe Demir', startDate: '2023-08-15', endDate: '2023-08-25', status: 'Beklemede', type: 'Yıllık İzin' },
];

const LeaveRequestsScreen = () => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Onaylandı': return '#4caf50';
      case 'Beklemede': return '#ff9800';
      case 'Reddedildi': return '#f44336';
      default: return '#666';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <Text style={styles.employeeName}>{item.employeeName}</Text>
      <Text style={styles.requestDetail}>{item.type}</Text>
      <Text style={styles.requestDetail}>Tarih: {item.startDate} - {item.endDate}</Text>
      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockLeaveRequests}
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
  requestCard: {
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
  requestDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default LeaveRequestsScreen; 