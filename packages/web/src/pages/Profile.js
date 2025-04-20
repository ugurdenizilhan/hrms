import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab
} from '@mui/material';
import {
  Save as SaveIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { userService } from '@hrms/common';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          const mockUser = {
            id: 1,
            firstName: 'Ahmet',
            lastName: 'Yılmaz',
            email: 'ahmet.yilmaz@example.com',
            phone: '+90 555 123 4567',
            address: 'Atatürk Mah. Cumhuriyet Cad. No:123 İstanbul',
            role: 'HR_MANAGER',
            department: 'İnsan Kaynakları',
            position: 'İK Müdürü',
            hireDate: '2020-03-15',
            leaveBalance: 15,
            recentActivities: [
              { id: 1, action: 'İzin talebi onaylandı', target: 'Mehmet Kaya', date: '2023-06-05' },
              { id: 2, action: 'Yeni çalışan eklendi', target: 'Zeynep Şahin', date: '2023-06-03' },
              { id: 3, action: 'İzin talebi reddedildi', target: 'Ali Yıldız', date: '2023-05-28' },
              { id: 4, action: 'Departman güncellendi', target: 'Pazarlama', date: '2023-05-20' },
            ]
          };
          setUser(mockUser);
          setFormData({
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            email: mockUser.email,
            phone: mockUser.phone,
            address: mockUser.address,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulating API call to update profile
    console.log('Profile update data:', formData);
    // In a real app, you would use userService.updateUser here
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Simulating API call to update password
    console.log('Password update data:', passwordData);
    // In a real app, you would implement password update logic here
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
              src="/broken-image.jpg"
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4">{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.position} - {user.department}
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2">Çalışan ID: {user.id}</Typography>
              <Typography variant="body2">İşe Başlama: {user.hireDate}</Typography>
              <Typography variant="body2">Kalan İzin: {user.leaveBalance} gün</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab icon={<PersonIcon />} label="Profil Bilgileri" id="profile-tab-0" />
        <Tab icon={<SecurityIcon />} label="Şifre Değiştir" id="profile-tab-1" />
        <Tab icon={<HistoryIcon />} label="Aktiviteler" id="profile-tab-2" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box component="form" onSubmit={handleProfileUpdate}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ad"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soyad"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Kaydet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box component="form" onSubmit={handlePasswordUpdate}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mevcut Şifre"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Yeni Şifre"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Yeni Şifre (Tekrar)"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Şifreyi Güncelle
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Son Aktiviteler
            </Typography>
            <Divider />
            <List>
              {user.recentActivities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${activity.action}: ${activity.target}`}
                      secondary={activity.date}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default Profile; 