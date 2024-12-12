import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ pt: '15px' }}>
      <Box 
        sx={{ 
          my: 8, 
          textAlign: 'center',
          background: 'linear-gradient(145deg, #FDFBF3 0%, #FEF9E6 100%)',
          borderRadius: '20px',
          padding: '4rem 2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: '#4CAF50'
          }}
        >
          제주 애월읍 초당옥수수
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 4 }}
        >
          제주의 햇살과 해풍으로 자란 달콤한 초당옥수수
          <br />
          입안 가득 퍼지는 과즙의 단맛을 경험해보세요
        </Typography>
        
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/order')}
              sx={{ 
                fontSize: '1.2rem', 
                py: 1.5, 
                px: 4,
                borderRadius: '30px',
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#388E3C'
                },
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
              }}
            >
              지금 주문하기
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => navigate('/cultivation')}
              sx={{ 
                fontSize: '1.2rem', 
                py: 1.5, 
                px: 4,
                borderRadius: '30px',
                color: '#4CAF50',
                borderColor: '#4CAF50',
                '&:hover': {
                  borderColor: '#388E3C',
                  color: '#388E3C'
                }
              }}
            >
              재배 과정 보기
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4} sx={{ my: 8 }}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              height: '100%', 
              transition: 'transform 0.3s', 
              '&:hover': { 
                transform: 'translateY(-10px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
              },
              background: 'linear-gradient(145deg, #ffffff 0%, #FDFBF3 100%)'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50' }}>
              🌞 제주의 태양
            </Typography>
            <Typography>
              제주의 따뜻한 햇살과 해풍을 받고 자라
              일반 옥수수보다 2배 이상 달콤한
              초당옥수수를 만나보세요.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              height: '100%', 
              transition: 'transform 0.3s', 
              '&:hover': { 
                transform: 'translateY(-10px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
              },
              background: 'linear-gradient(145deg, #ffffff 0%, #FDFBF3 100%)'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50' }}>
              💧 청정 용천수
            </Typography>
            <Typography>
              애월읍의 맑은 용천수로 재배되어
              더욱 촉촉하고 신선한 단맛이
              그대로 살아있습니다.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              height: '100%', 
              transition: 'transform 0.3s', 
              '&:hover': { 
                transform: 'translateY(-10px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
              },
              background: 'linear-gradient(145deg, #ffffff 0%, #FDFBF3 100%)'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#4CAF50' }}>
              ⭐ 특별한 맛
            </Typography>
            <Typography>
              화산토양의 미네랄과 해풍의 염분이
              만나 탄생한 특별한 단맛,
              한 번 맛보면 잊을 수 없습니다.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 