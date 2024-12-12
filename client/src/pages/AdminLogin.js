import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper,
  styled, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminPanelSettings, Lock } from '@mui/icons-material';

const FormContainer = styled(Paper)({
  padding: '3rem',
  borderRadius: '15px',
  maxWidth: '500px',
  margin: '0 auto',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'chekd4032') {
      localStorage.setItem('adminToken', 'admin-token');
      navigate('/admin/dashboard');
    } else {
      setError('관리자 정보가 일치하지 않습니다.');
    }
  };

  return (
    <Container sx={{ pt: '80px', pb: '3rem' }}>
      <FormContainer>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <AdminPanelSettings sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
            관리자 로그인
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="관리자 아이디"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <StyledTextField
            fullWidth
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<Lock />}
          >
            로그인
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default AdminLogin; 