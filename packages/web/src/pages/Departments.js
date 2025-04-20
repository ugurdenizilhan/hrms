import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { departmentService } from '@hrms/common';

const Departments = () => {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          const mockDepartments = [
            { id: 1, name: 'IT', managerName: 'Ahmet Yılmaz', employeeCount: 15 },
            { id: 2, name: 'İnsan Kaynakları', managerName: 'Ayşe Demir', employeeCount: 5 },
            { id: 3, name: 'Pazarlama', managerName: 'Zeynep Şahin', employeeCount: 8 },
            { id: 4, name: 'Finans', managerName: 'Mustafa Aydın', employeeCount: 6 },
            { id: 5, name: 'Üretim', managerName: 'Ali Yıldız', employeeCount: 20 },
            { id: 6, name: 'Satış', managerName: 'Fatma Öztürk', employeeCount: 12 },
          ];
          setDepartments(mockDepartments);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Departmanlar</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Yeni Departman
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {departments.map((department) => (
              <Grid item xs={12} sm={6} md={4} key={department.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{department.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Yönetici: {department.managerName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <PeopleIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="body2">
                            {department.employeeCount} Çalışan
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Tooltip title="Düzenle">
                          <IconButton size="small" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>Tüm Departmanlar</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Departman Adı</TableCell>
                  <TableCell>Yönetici</TableCell>
                  <TableCell align="center">Çalışan Sayısı</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>{department.name}</TableCell>
                    <TableCell>{department.managerName}</TableCell>
                    <TableCell align="center">{department.employeeCount}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Düzenle">
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sil">
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Departments; 