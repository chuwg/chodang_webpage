import React from 'react';
import { 
  Container, Typography, Paper, Grid, Box, Button, 
  Avatar, Divider, Chip, styled 
} from '@mui/material';
import { 
  Person, ShoppingBasket, LocalShipping, 
  Edit, Favorite, History 
} from '@mui/icons-material';

const StyledPaper = styled(Paper)({
  padding: '2rem',
  borderRadius: '15px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  height: '100%',
});

const ProfileAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: '0 auto 1rem',
  border: '3px solid #2E7D32',
});

const StatusChip = styled(Chip)({
  margin: '0.5rem',
  fontWeight: 'bold',
});

const OrderCard = styled(Paper)({
  padding: '1.5rem',
  marginBottom: '1rem',
  borderRadius: '10px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
});

const MyPage = () => {
  // 임시 사용자 데이터
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2024.01.15',
    level: 'GOLD',
    orderHistory: [
      {
        id: 1,
        date: '2024.03.15',
        product: '프리미엄 초당옥수수 세트',
        price: '39,900원',
        status: '배송완료',
        orderNumber: 'ORDER-2024031501',
      },
      {
        id: 2,
        date: '2024.03.01',
        product: '일반 초당옥수수 세트',
        price: '29,900원',
        status: '배송중',
        orderNumber: 'ORDER-2024030101',
      },
    ],
  };

  return (
    <Container sx={{ 
      marginTop: '80px',
      marginBottom: '3rem' 
    }}>
      <Typography 
        variant="h3" 
        color="primary" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        마이페이지
      </Typography>

      <Grid container spacing={4}>
        {/* 프로필 섹션 */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ textAlign: 'center' }}>
              <ProfileAvatar>
                <Person sx={{ fontSize: 50 }} />
              </ProfileAvatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Chip 
                label={`${user.level} 회원`}
                color="primary"
                sx={{ margin: '1rem 0' }}
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                fullWidth
                sx={{ marginTop: '1rem' }}
              >
                프로필 수정
              </Button>
            </Box>

            <Divider sx={{ margin: '2rem 0' }} />

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                나의 쇼핑 활동
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Favorite color="primary" />
                  <Typography>찜 목록</Typography>
                  <Typography variant="h6">5</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <ShoppingBasket color="primary" />
                  <Typography>주문</Typography>
                  <Typography variant="h6">8</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <History color="primary" />
                  <Typography>리뷰</Typography>
                  <Typography variant="h6">3</Typography>
                </Box>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>

        {/* 주문 내역 섹션 */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              주문 내역
            </Typography>
            
            {user.orderHistory.map((order) => (
              <OrderCard key={order.id} elevation={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle2" color="text.secondary">
                      주문번호: {order.orderNumber}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1 }}>
                      {order.product}
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                      {order.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                    <StatusChip
                      icon={<LocalShipping />}
                      label={order.status}
                      color={order.status === '배송완료' ? 'success' : 'primary'}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      주문일: {order.date}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      상세보기
                    </Button>
                  </Grid>
                </Grid>
              </OrderCard>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPage;