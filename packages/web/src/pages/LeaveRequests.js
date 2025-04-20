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
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  RemoveRedEye as ViewIcon
} from '@mui/icons-material';
import { leaveRequestService } from '@hrms/common';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`leave-tabpanel-${index}`}
      aria-labelledby={`leave-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const LeaveRequests = () => {
  const [loading, setLoading] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          const mockLeaveRequests = [
            { id: 1, employeeName: 'Ahmet Yılmaz', startDate: '2023-06-10', endDate: '2023-06-15', reason: 'Yıllık izin', status: 'PENDING', createdAt: '2023-06-01' },
            { id: 2, employeeName: 'Ayşe Demir', startDate: '2023-06-12', endDate: '2023-06-13', reason: 'Sağlık', status: 'APPROVED', approvedBy: 'Mehmet Kaya', createdAt: '2023-06-02' },
            { id: 3, employeeName: 'Mehmet Kaya', startDate: '2023-06-15', endDate: '2023-06-20', reason: 'Yıllık izin', status: 'PENDING', createdAt: '2023-06-03' },
            { id: 4, employeeName: 'Zeynep Şahin', startDate: '2023-06-20', endDate: '2023-06-22', reason: 'Aile ziyareti', status: 'APPROVED', approvedBy: 'Mehmet Kaya', createdAt: '2023-06-05' },
            { id: 5, employeeName: 'Mustafa Aydın', startDate: '2023-06-25', endDate: '2023-06-30', reason: 'Yıllık izin', status: 'REJECTED', approvedBy: 'Mehmet Kaya', createdAt: '2023-06-08' },
          ];
          setLeaveRequests(mockLeaveRequests);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const getStatusChip = (status) => {
    if (status === 'PENDING') {
      return <Chip label="Beklemede" color="warning" size="small" />;
    } else if (status === 'APPROVED') {
      return <Chip label="Onaylandı" color="success" size="small" />;
    } else {
      return <Chip label="Reddedildi" color="error" size="small" />;
    }
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'PENDING');
  const approvedRequests = leaveRequests.filter(req => req.status === 'APPROVED');
  const rejectedRequests = leaveRequests.filter(req => req.status === 'REJECTED');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">İzin Talepleri</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
        >
          Yeni İzin Talebi
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label={`Tümü (${leaveRequests.length})`} id="leave-tab-0" />
            <Tab label={`Bekleyen (${pendingRequests.length})`} id="leave-tab-1" />
            <Tab label={`Onaylanan (${approvedRequests.length})`} id="leave-tab-2" />
            <Tab label={`Reddedilen (${rejectedRequests.length})`} id="leave-tab-3" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <LeaveRequestTable 
              leaveRequests={leaveRequests} 
              getStatusChip={getStatusChip} 
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <LeaveRequestTable 
              leaveRequests={pendingRequests} 
              getStatusChip={getStatusChip} 
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <LeaveRequestTable 
              leaveRequests={approvedRequests} 
              getStatusChip={getStatusChip} 
            />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <LeaveRequestTable 
              leaveRequests={rejectedRequests} 
              getStatusChip={getStatusChip} 
            />
          </TabPanel>
        </>
      )}
    </Box>
  );
};

const LeaveRequestTable = ({ leaveRequests, getStatusChip }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Çalışan</TableCell>
            <TableCell>Başlangıç</TableCell>
            <TableCell>Bitiş</TableCell>
            <TableCell>Sebep</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary">
                  Listelenecek izin talebi bulunamadı.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            leaveRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.employeeName}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{getStatusChip(request.status)}</TableCell>
                <TableCell>{request.createdAt}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Detay">
                    <IconButton size="small" color="default">
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  {request.status === 'PENDING' && (
                    <>
                      <Tooltip title="Onayla">
                        <IconButton size="small" color="success">
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reddet">
                        <IconButton size="small" color="error">
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveRequests; 