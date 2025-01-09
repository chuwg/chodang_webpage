import React, { useState } from 'react';
import { 
  Container, Typography, TextField, Button, Box, Paper,
  Stepper, Step, StepLabel, styled, Divider 
} from '@mui/material';
import { Person, Email, Lock, Done } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Paper)({
  padding: '3rem',
  borderRadius: '15px',
  maxWidth: '600px',
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
  marginTop: '1rem',
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

const Signup = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  const steps = ['기본 정보', '연락처 정보', '완료'];

  const validationRules = {
    username: {
      required: true,
      pattern: /^[a-zA-Z0-9_]{4,20}$/,
      message: '아이디는 4-20자의 영문, 숫자, 밑줄(_)만 사용 가능합니다',
    },
    email: {
      required: false,
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: '유효한 이메일 주소를 입력해주세요'
    },
    password: {
      required: true,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다',
    },
    phone: {
      required: true,
      pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      message: '올바른 휴대폰 번호를 입력해주세요',
    },
    address: {
      required: true,
      minLength: 10,
      message: '상세한 주소를 입력해주세요',
    },
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const sanitizeInput = (value) => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    // 이메일의 경우 값이 있을 때만 패턴 검사
    if (name === 'email' && value) {
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
    } else {
      // 다른 필드들의 검증
      if (rule.required && !value) {
        return '필수 입력 항목입니다';
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }

    return '';
  };

  const checkUsername = async (username) => {
    try {
      console.log('Checking username:', username); // 디버깅용
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();
      console.log('Server response:', data); // 디버깅용
      return data.available;
    } catch (error) {
      console.error('아이디 중복 체크 에러:', error);
      return true; // 에러 발생 시 사용 가능한 것으로 처리
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let processedValue = sanitizeInput(value);

    if (name === 'phone') {
      processedValue = formatPhone(processedValue);
    }

    if (name === 'username') {
      processedValue = processedValue.replace(/[^a-zA-Z0-9_]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    let error = validateField(name, processedValue);

    // 아이디 중복 체크는 유효성 검사를 통과한 경우에만 실행
    if (name === 'username' && processedValue.length >= 4 && !error) {
      try {
        const isAvailable = await checkUsername(processedValue);
        if (!isAvailable) {
          error = '이미 사용 중인 아이디입니다';
        }
      } catch (err) {
        console.error('아이디 체크 에러:', err);
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateStep = () => {
    const currentFields = {
      0: ['username', 'password'],
      1: ['phone', 'address'],
    }[activeStep] || [];

    const stepErrors = {};
    let isValid = true;

    currentFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        stepErrors[field] = error;
        isValid = false;
      }
    });

    // 이메일이 입력된 경우에만 유효성 검사
    if (formData.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) {
        stepErrors.email = emailError;
        isValid = false;
      }
    }

    setErrors(prev => ({
      ...prev,
      ...stepErrors
    }));

    return isValid;
  };

  const handleSubmit = async () => {
    try {
      // 필수 필드만 유효성 검사
      const requiredFields = ['username', 'password', 'phone', 'address'];
      const newErrors = {};
      
      requiredFields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      });

      if (formData.email) {
        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const submitData = {
        ...formData,
        email: formData.email || undefined
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      setActiveStep(2);
      setTimeout(() => navigate('/login'), 3000);

    } catch (error) {
      console.error('회원가입 에러:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    }
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();  // 이벤트 전파 중지
    }
    
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <StyledTextField
              fullWidth
              label="아이디"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <StyledTextField
              fullWidth
              label="이메일 (선택사항)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <StyledTextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
              sx={{ 
                '& input': { 
                  WebkitTextSecurity: 'disc' 
                }
              }}
              inputProps={{
                autocomplete: 'new-password',
                'data-lpignore': true,
                style: { WebkitTextSecurity: 'disc' }
              }}
              InputProps={{
                startAdornment: <Lock color="primary" sx={{ mr: 1 }} />,
                type: 'text'
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <StyledTextField
              fullWidth
              label="전화번호"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="010-0000-0000"
            />
            <StyledTextField
              fullWidth
              label="주소"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              error={!!errors.address}
              helperText={errors.address}
              multiline
              rows={3}
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Done sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              회원가입이 완료되었습니다!
            </Typography>
            <Typography color="text.secondary">
              제주 애월읍 초당옥수수의 특별한 맛을 즐겨보세요.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
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
          회원가입
        </Typography>

        <Box sx={{ mb: 3 }}>
          <SocialButton
            variant="outlined"
            onClick={() => handleSocialLogin('google')}
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
            onClick={() => handleSocialLogin('kakao')}
            sx={{ 
              bgcolor: '#FEE500',
              color: '#000000',
              '&:hover': { bgcolor: '#FEE500', opacity: 0.9 }
            }}
          >
            <img src="/kakao-icon.png" alt="Kakao" />
            카카오로 계속하기
          </SocialButton>

          <SocialButton
            variant="contained"
            onClick={() => handleSocialLogin('naver')}
            sx={{ 
              bgcolor: '#03C75A',
              color: '#ffffff',
              '&:hover': { bgcolor: '#03C75A', opacity: 0.9 }
            }}
          >
            <img src="/naver-icon.png" alt="Naver" />
            네이버로 계속하기
          </SocialButton>
        </Box>

        <OrDivider>
          <Typography variant="body2" sx={{ mx: 2, color: '#666' }}>
            또는 이메일로 가입하기
          </Typography>
        </OrDivider>

        <Stepper activeStep={activeStep} sx={{ marginBottom: '3rem' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="div" role="form" onSubmit={(e) => e.preventDefault()}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {activeStep !== 0 && (
              <StyledButton
                onClick={handleBack}
                variant="outlined"
                color="primary"
              >
                이전
              </StyledButton>
            )}
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => {
                if (activeStep === steps.length - 2) {
                  handleSubmit();
                } else {
                  handleNext();
                }
              }}
              sx={{ ml: 'auto' }}
            >
              {activeStep === steps.length - 1 ? '완료' : '다음'}
            </StyledButton>
          </Box>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default Signup; 