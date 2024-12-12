import React from 'react';
import { Container, Typography, Box, Grid, Paper, styled } from '@mui/material';
import { WbSunny, WaterDrop, Landscape, Timer } from '@mui/icons-material';

const StyledSection = styled(Box)({
  backgroundColor: '#FDFBF3',
  padding: '3rem',
  borderRadius: '15px',
  marginBottom: '2rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #FDFBF3 0%, #FEF9E6 100%)'
});

const FeatureCard = styled(Paper)({
  padding: '2rem',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
});

const IconWrapper = styled(Box)({
  color: '#4CAF50',
  marginBottom: '1rem',
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
  },
});

const About = () => {
  const features = [
    {
      icon: <WbSunny />,
      title: '제주의 햇살',
      description: '따뜻한 제주 햇살을 받고 자라 더욱 달콤합니다.',
    },
    {
      icon: <WaterDrop />,
      title: '청정 용천��',
      description: '애월읍의 맑은 용천수로 재배되어 촉촉하고 신선합니다.',
    },
    {
      icon: <Landscape />,
      title: '화산토양',
      description: '미네랄이 풍부한 화산토양에서 자라 영양이 가득합니다.',
    },
    {
      icon: <Timer />,
      title: '최적기 수확',
      description: '당도가 가장 높은 시기를 맞춰 수확하여 신선함을 전해드립니다.',
    },
  ];

  return (
    <Container sx={{ 
      pt: '80px', 
      pb: '3rem'
    }}>
      <StyledSection>
        <Typography 
          variant="h3" 
          color="#4CAF50"
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          제주 애월읍 초당옥수수 이야기
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: '#555',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.8
          }}
          paragraph
        >
          제주도 애월읍의 비옥한 화산토양과 청정 용천수, 
          그리고 따뜻한 해풍이 만나 탄생한 초당옥수수는 
          일반 옥수수와는 차원이 다른 달콤함을 자랑합니다.
        </Typography>
      </StyledSection>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FeatureCard elevation={3}>
              <IconWrapper>
                {feature.icon}
              </IconWrapper>
              <Typography 
                variant="h5" 
                color="#4CAF50"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>

      <StyledSection sx={{ marginTop: '4rem' }}>
        <Typography 
          variant="h4" 
          color="#4CAF50"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          특별한 재배 과정
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.8
          }}
          paragraph
        >
          제주의 맑은 하늘 아래, 애월읍의 비옥한 땅에서 자라나는 초당옥수수는
          특별한 자연환경 덕분에 더욱 달콤하고 부드러운 맛을 자랑합니다.
          화산토양의 미네랄과 용천수의 영양분, 그리고 해풍의 적절한 염분이
          어우러져 더욱 달콤하고 부드러운 맛을 만들어냅니다.
          특히 수확 시기를 철저히 관리하여 최상의 당도를 유지합니다.
        </Typography>
      </StyledSection>

      <StyledSection>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="/corn-field.jpg"
              alt="제주 애월읍 초당옥수수 밭"
              sx={{
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="#4CAF50" gutterBottom sx={{ fontWeight: 'bold' }}>
              최상의 맛을 위한 노력
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }} paragraph>
              수확부터 배송까지 신선도를 위한 철저한 관리로
              제주 현지의 맛 그대로를 전해드립니다.
              최적의 수확 시기를 맞춰 수확한 옥수수로
              제주 애월읍의 특별한 맛을 선물해드립니다.
            </Typography>
          </Grid>
        </Grid>
      </StyledSection>
    </Container>
  );
};

export default About; 