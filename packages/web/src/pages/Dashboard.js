import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { 
  PeopleAlt as PeopleIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { employeeService, departmentService, leaveRequestService } from '@hrms/common';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    employeeCount: 0,
    departmentCount: 0,
    pendingLeaveRequests: 0,
  });
  const [recentLeaveRequests, setRecentLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, we'd get this data from the API
        // For demo purposes, let's simulate some data
        
        // Simulate API calls
        /*
        const employees = await employeeService.getEmployees();
        const departments = await departmentService.getDepartments();
        const leaveRequests = await leaveRequestService.getLeaveRequests();
        
        setStats({
          employeeCount: employees.length,
          departmentCount: departments.length,
          pendingLeaveRequests: leaveRequests.filter(req => req.status === 'PENDING').length,
        });
        
        setRecentLeaveRequests(
          leaveRequests
            .filter(req => req.status === 'PENDING')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
        );
        */
        
        // Mock data for demo
        setTimeout(() => {
          setStats({
            employeeCount: 42,
            departmentCount: 6,
            pendingLeaveRequests: 8,
          });
          
          setRecentLeaveRequests([
            { id: 1, employeeName: 'Ahmet Yılmaz', startDate: '2023-06-10', endDate: '2023-06-15', reason: 'Yıllık izin' },
            { id: 2, employeeName: 'Ayşe Demir', startDate: '2023-06-12', endDate: '2023-06-13', reason: 'Sağlık' },
            { id: 3, employeeName: 'Mehmet Kaya', startDate: '2023-06-15', endDate: '2023-06-20', reason: 'Yıllık izin' },
          ]);
          
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Dashboard data loading error:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Genel Bakış
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" component="div">{stats.employeeCount}</Typography>
              <Typography variant="body2" color="text.secondary">Toplam Çalışan</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <BusinessIcon sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
            <Box>
              <Typography variant="h5" component="div">{stats.departmentCount}</Typography>
              <Typography variant="body2" color="text.secondary">Toplam Departman</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <EventIcon sx={{ fontSize: 40, mr: 2, color: 'warning.main' }} />
            <Box>
              <Typography variant="h5" component="div">{stats.pendingLeaveRequests}</Typography>
              <Typography variant="body2" color="text.secondary">Bekleyen İzin Talebi</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Bekleyen İzin Talepleri" />
            <Divider />
            <CardContent>
              {loading ? (
                <Typography>Yükleniyor...</Typography>
              ) : recentLeaveRequests.length > 0 ? (
                <List>
                  {recentLeaveRequests.map((request) => (
                    <React.Fragment key={request.id}>
                      <ListItem>
                        <ListItemText
                          primary={request.employeeName}
                          secondary={`${request.startDate} - ${request.endDate}: ${request.reason}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                  <WarningIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography color="text.secondary">Bekleyen izin talebi bulunmamaktadır.</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Duyurular" />
            <Divider />
            <CardContent>
              <Typography>
                Şirket duyuruları burada görüntülenecek.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 