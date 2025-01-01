import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

function Cultivation() {
  const cultivationSteps = [
    {
      title: '1. 토양 준비',
      description: '화산송이로 이루어진 제주 토양에 유기농 퇴비를 더해 최적의 재배 환경을 조성합니다.',
      image: '/images/soil-prep.jpg'
    },
    {
      title: '2. 씨앗 파종',
      description: '엄선된 초당옥수수 종자를 적정 간격으로 파종하여 충분한 생장 공간을 확보합니다.',
      image: '/images/seeding.jpg'
    },
    {
      title: '3. 용천수 관리',
      description: '애월읍의 청정 용천수를 활용한 과학적인 수분 관리로 최상의 당도를 유지합니다.',
      image: '/images/water-management.jpg'
    },
    {
      title: '4. 수확',
      description: '옥수수 알맹이가 가장 탱글탱글하고 달콤한 시기를 정확히 파악하여 수확합니다.',
      image: '/images/harvest.jpg'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: '80px', pb: '3rem' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: '#2E7D32',
            mb: 3
          }}
        >
          초당옥수수 재배 이야기
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 5 }}
        >
          제주 애월읍의 비옥한 화산토양과 청정 용천수,
          따스한 햇살과 시원한 해풍이 만나
          세상에서 가장 달콤한 초당옥수수가 탄생합니다.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {cultivationSteps.map((step, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Box
                sx={{
                  height: '250px',
                  mb: 2,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: '#2E7D32',
                  fontWeight: 'bold'
                }}
              >
                {step.title}
              </Typography>
              <Typography color="text.secondary">
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Cultivation; 