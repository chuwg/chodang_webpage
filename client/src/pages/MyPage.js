import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
}));

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        // 사용자 정보와 주문 내역을 병렬로 가져오기
        const [userResponse, ordersResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          }),
          fetch(`${process.env.REACT_APP_API_URL}/api/users/me/orders`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          })
        ]);

        if (!userResponse.ok || !ordersResponse.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const [userData, ordersData] = await Promise.all([
          userResponse.json(),
          ordersResponse.json()
        ]);

        setUserData(userData.data);
        setOrders(ordersData.data);
      } catch (error) {
        console.error('데이터 조회 에러:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 주문 상태를 한글로 변환하는 함수
  const getStatusInKorean = (status) => {
    const statusMap = {
      'pending': '주문 접수',
      'processing': '처리 중',
      'shipped': '배송 중',
      'delivered': '배송 완료',
      'cancelled': '주문 취소'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <Container sx={{ pt: '80px' }}>
        <Typography>로딩 중...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ pt: '80px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: '80px', pb: '3rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        내 정보
      </Typography>

      <StyledPaper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              아이디
            </Typography>
            <Typography variant="body1">
              {userData?.username}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              이메일
            </Typography>
            <Typography variant="body1">
              {userData?.email || '(등록된 이메일 없음)'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              전화번호
            </Typography>
            <Typography variant="body1">
              {userData?.phone}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              주소
            </Typography>
            <Typography variant="body1">
              {userData?.address}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              가입일
            </Typography>
            <Typography variant="body1">
              {new Date(userData?.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => {/* 정보 수정 기능 추가 예정 */}}
          >
            정보 수정
          </Button>
        </Box>
      </StyledPaper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
        주문 내역
      </Typography>
      <StyledPaper>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Box key={order._id} sx={{ mb: 3, pb: 3, borderBottom: '1px solid #eee' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary">
                    주문번호: {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    주문일: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                
                {order.products.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">
                          {item.product.name} x {item.quantity}개
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          개당 {item.price.toLocaleString()}원
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {(item.price * item.quantity).toLocaleString()}원
                      </Typography>
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="subtitle1">
                      상태: {getStatusInKorean(order.status)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      총 결제금액: {order.totalAmount.toLocaleString()}원
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            주문 내역이 없습니다.
          </Typography>
        )}
      </StyledPaper>
    </Container>
  );
};

export default MyPage;