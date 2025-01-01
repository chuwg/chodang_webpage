import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper,
  styled, Link as MuiLink, InputAdornment, IconButton, Alert 
} from '@mui/material';
import { 
  Email, Lock, Visibility, VisibilityOff, Person 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

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
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#2E7D32',
    },
  },
});

const StyledButton = styled(Button)({
  padding: '12px 0',
  fontSize: '1.1rem',
  width: '100%',
  marginBottom: '1rem',
  borderRadius: '8px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const SocialButton = styled(Button)({
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  borderRadius: '8px',
  justifyContent: 'flex-start',
  textAlign: 'left',
  '& img': {
    width: '24px',
    marginRight: '12px',
  },
});

const OrDivider = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '2rem 0',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: '1px solid #e0e0e0',
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSocialLogin = (provider) => {
    switch (provider) {
      case 'google':
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
        break;
      case 'kakao':
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
        break;
      case 'naver':
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/naver`;
        break;
      default:
        break;
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) return '아이디를 입력해주세요';
        if (value.length < 4) return '아이디는 4자 이상이어야 합니다';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return '아이디는 영문, 숫자, 밑줄(_)만 사용 가능합니다';
        }
        return '';
      case 'password':
        if (!value) return '비밀번호를 입력해주세요';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    // 기본 유효성 검사
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 관리자 계정 확인
    if (formData.username === 'admin' && formData.password === 'chekd4032') {
      try {
        const response = await fetch('http://localhost:5001/api/auth/admin-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        });

        const data = await response.json();
        console.log('서버 응답:', data);  // 디버깅용

        if (!response.ok) {
          throw new Error(data.message || '관리자 로그인에 실패했습니다.');
        }

        if (data.success && data.token) {
          localStorage.setItem('adminToken', `Bearer ${data.token}`);
          navigate('/admin/dashboard');
        } else {
          throw new Error('토큰이 없습니다.');
        }
      } catch (error) {
        console.error('관리자 로그인 에러:', error);
        setLoginError(error.message || '관리자 로그인 처리 중 오류가 발생했습니다.');
      }
      return;
    }

    try {
      // 로그인 API 호출
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '아이디 또는 비밀번호를 확인해주세요');
      }

      // 로그인 성공
      localStorage.setItem('userToken', data.token);
      navigate('/');

    } catch (error) {
      setLoginError('아이디 또는 비밀번호를 확인해주세요');
      localStorage.removeItem('userToken');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  const handleNaverLogin = () => {
    window.location.href = '/auth/naver';
  };

  const handleKakaoLogin = () => {
    window.location.href = '/auth/kakao';
  };

  return (
    <Container sx={{ pt: '80px', pb: '3rem' }}>
      <FormContainer>
        <Typography 
          variant="h4" 
          color="primary" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}
        >
          로그인
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <SocialButton
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{ 
              borderColor: '#EA4335',
              color: '#EA4335',
              '&:hover': { borderColor: '#EA4335', opacity: 0.9 }
            }}
          >
            <img src="/google-icon.png" alt="Google" />
            Google로 계속하기
          </SocialButton>
          
          <SocialButton
            variant="contained"
            onClick={handleNaverLogin}
            sx={{ 
              bgcolor: '#2DB400',
              color: '#ffffff',
              '&:hover': { bgcolor: '#2DB400', opacity: 0.9 }
            }}
          >
            <img src="/naver-icon.png" alt="Naver" />
            네이버로 계속하기
          </SocialButton>

          <SocialButton
            variant="contained"
            onClick={handleKakaoLogin}
            sx={{ 
              bgcolor: '#FEE500',
              color: '#000000',
              '&:hover': { bgcolor: '#FEE500', opacity: 0.9 }
            }}
          >
            <img src="/kakao-icon.png" alt="Kakao" />
            카카오로 계속하기
          </SocialButton>
        </Box>

        <OrDivider>
          <Typography variant="body2" sx={{ mx: 2, color: '#666' }}>
            또는 아이디로 로그인
          </Typography>
        </OrDivider>

        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="아이디"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
            }}
          />
          <StyledTextField
            fullWidth
            label="비밀번호"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: <Lock color="primary" sx={{ mr: 1 }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            로그인
          </StyledButton>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <MuiLink 
            component={Link} 
            to="/signup"
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            아직 회원이 아니신가요? 회원가입
          </MuiLink>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Login; 