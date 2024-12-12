import React from 'react';
import { 
  Container, Typography, Box, Grid, Paper, styled,
  Stack, Divider
} from '@mui/material';
import { 
  Grass, WbSunny, LocalFlorist, Agriculture,
  LocalShipping
} from '@mui/icons-material';

const StyledSection = styled(Box)({
  background: 'linear-gradient(145deg, #FDFBF3 0%, #FEF9E6 100%)',
  padding: '3rem',
  borderRadius: '15px',
  marginBottom: '2rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
});

const ProcessCard = styled(Paper)({
  padding: '2rem',
  height: '100%',
  borderRadius: '15px',
  background: 'linear-gradient(145deg, #ffffff 0%, #FDFBF3 100%)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
});

const ProcessStep = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem',
  position: 'relative',
});

const Cultivation = () => {
  const cultivationProcess = [
    {
      icon: <Grass />,
      title: '씨상급 씨앗 선별',
      period: '2월',
      description: '당도 높은 초당옥수수 생산을 위해 엄선된 씨앗만을 선별합니다.',
    },
    {
      icon: <LocalFlorist />,
      title: '정성스러운 파종',
      period: '3월',
      description: '제주 화산토양의 영양분이 가득한 땅에 정성껏 심어냅니다.',
    },
    {
      icon: <WbSunny />,
      title: '자연과 함께 성장',
      period: '4-5월',
      description: '제주의 따뜻한 햇살과 해풍, 청정 용천수로 키워냅니다.',
    },
    {
      icon: <Agriculture />,
      title: '최적기 수확',
      period: '6-7월',
      description: '당도와 식감이 가장 완벽한 순간에 수확합니다.',
    },
    {
      icon: <LocalShipping />,
      title: '신선 배송',
      period: '수확 당일',
      description: '수확한 옥수수를 그날 바로 고객님께 전해드립니다.',
    },
  ];

  return (
    <Container sx={{ pt: '80px', pb: '3rem' }}>
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
          달콤함을 키워내는 과정
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center',
            color: '#555',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: 1.8
          }}
        >
          제주 애월읍의 비옥한 화산토양에서
          정성과 시간을 들여 키워낸 초당옥수수,
          그 특별한 여정을 소개합니다.
        </Typography>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          divider={<Divider orientation="vertical" flexItem sx={{ borderColor: '#4CAF50' }} />}
          sx={{ mb: 4 }}
        >
          {cultivationProcess.map((process, index) => (
            <ProcessStep key={index}>
              <Box 
                sx={{ 
                  color: '#4CAF50',
                  mb: 2,
                  '& .MuiSvgIcon-root': {
                    fontSize: '2.5rem'
                  }
                }}
              >
                {process.icon}
              </Box>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#4CAF50',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}
              >
                {process.period}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  my: 1,
                  color: '#2E7D32'
                }}
              >
                {process.title}
              </Typography>
              <Typography 
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {process.description}
              </Typography>
            </ProcessStep>
          ))}
        </Stack>
      </StyledSection>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box 
            component="img"
            src="/cultivation-1.jpg"
            alt="초당옥수수 재배 과정"
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="#4CAF50" gutterBottom sx={{ fontWeight: 'bold' }}>
            자연이 만든 완벽한 단맛
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            제주 애월읍의 화산토양은 미네랄이 풍부하여 초당옥수수가 자라기에
            최적의 환경을 제공합니다. 청정 용천수로 자란 초당옥수수는
            일반 옥수수와는 비교할 수 없는 특별한 단맛을 자랑합니다.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            수확부터 배송까지 신선도 유지에 심혈을 기울여
            제주 현지에서 느낄 수 있는 그 달콤한 맛 그대로를
            고객님의 식탁에서도 경험하실 수 있습니다.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cultivation; 