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
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { employeeService } from '@hrms/common';

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          const mockEmployees = [
            { id: 1, firstName: 'Ahmet', lastName: 'Yılmaz', email: 'ahmet.yilmaz@example.com', position: 'Yazılım Geliştirici', department: 'IT', hireDate: '2021-05-12' },
            { id: 2, firstName: 'Ayşe', lastName: 'Demir', email: 'ayse.demir@example.com', position: 'İnsan Kaynakları Uzmanı', department: 'İK', hireDate: '2020-11-23' },
            { id: 3, firstName: 'Mehmet', lastName: 'Kaya', email: 'mehmet.kaya@example.com', position: 'Proje Yöneticisi', department: 'IT', hireDate: '2019-08-15' },
            { id: 4, firstName: 'Zeynep', lastName: 'Şahin', email: 'zeynep.sahin@example.com', position: 'Pazarlama Uzmanı', department: 'Pazarlama', hireDate: '2022-02-01' },
            { id: 5, firstName: 'Mustafa', lastName: 'Aydın', email: 'mustafa.aydin@example.com', position: 'Finans Müdürü', department: 'Finans', hireDate: '2018-04-10' },
          ];
          setEmployees(mockEmployees);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Çalışanlar</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Yeni Çalışan
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>Soyad</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Pozisyon</TableCell>
                <TableCell>Departman</TableCell>
                <TableCell>İşe Başlama</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.hireDate}</TableCell>
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
      )}
    </Box>
  );
};

export default Employees; 