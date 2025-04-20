import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DashboardScreen = () => {
  const stats = {
    totalEmployees: 87,
    departments: 5,
    pendingLeaves: 12,
    absentToday: 8,
  };

  const recentActivities = [
    { id: 1, action: 'İzin talebi onaylandı', target: 'Mehmet Kaya', date: '2023-06-05' },
    { id: 2, action: 'Yeni çalışan eklendi', target: 'Zeynep Şahin', date: '2023-06-03' },
    { id: 3, action: 'İzin talebi reddedildi', target: 'Ali Yıldız', date: '2023-05-28' },
    { id: 4, action: 'Departman güncellendi', target: 'Pazarlama', date: '2023-05-20' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Merhaba, Ahmet!</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('tr-TR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalEmployees}</Text>
          <Text style={styles.statLabel}>Toplam Çalışan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.departments}</Text>
          <Text style={styles.statLabel}>Departman</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.pendingLeaves}</Text>
          <Text style={styles.statLabel}>Bekleyen İzin</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.absentToday}</Text>
          <Text style={styles.statLabel}>Bugün İzinli</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
      </View>

      {recentActivities.map((activity) => (
        <View key={activity.id} style={styles.activityCard}>
          <Text style={styles.activityText}>
            <Text style={styles.activityAction}>{activity.action}</Text>
            {' - '}
            <Text style={styles.activityTarget}>{activity.target}</Text>
          </Text>
          <Text style={styles.activityDate}>{activity.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#1976d2',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 8,
  },
  activityAction: {
    fontWeight: 'bold',
  },
  activityTarget: {
    fontStyle: 'italic',
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default DashboardScreen; 