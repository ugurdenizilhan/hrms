import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Alert,
  CircularProgress 
} from '@mui/material';
import { authService, setAuthToken } from '@hrms/common';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Test için hard-coded giriş
    if (email === "admin@example.com" && password === "admin123") {
      const mockToken = "mock-jwt-token-12345";
      localStorage.setItem('token', mockToken);
      setAuthToken(mockToken);
      setAuthenticated(true);
      return;
    }
    
    if (!email || !password) {
      setError('Lütfen email ve şifrenizi girin');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(email, password);
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setAuthToken(response.token);
        setAuthenticated(true);
      } else {
        throw new Error('Geçersiz giriş bilgileri');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            HRMS
          </Typography>
          <Typography component="h2" variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            İnsan Kaynakları Yönetim Sistemi
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Giriş Yap'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 