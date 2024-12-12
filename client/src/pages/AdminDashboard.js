import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Table,
  TableBody, TableCell, TableHead, TableRow, TableContainer,
  Card, CardContent, styled 
} from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ShoppingCart, LocalShipping, Person, AttachMoney 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  height: '100%',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
});

const StatCard = ({ icon, title, value, color }) => (
  <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>{title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ color }}>{value}</Typography>
    </CardContent>
  </StyledCard>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 관리자 인증 체크
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login');
    }
  }, [navigate]);

  // 샘플 데이터
  const orderData = [
    { date: '2024-01-01', orders: 15, deliveries: 12 },
    { date: '2024-01-02', orders: 20, deliveries: 18 },
    { date: '2024-01-03', orders: 25, deliveries: 22 },
    // ... 더 많은 데이터
  ];

  const customerOrders = [
    { id: 1, name: '김철수', email: 'kim@example.com', totalOrders: 5, totalAmount: 250000 },
    { id: 2, name: '이영희', email: 'lee@example.com', totalOrders: 3, totalAmount: 150000 },
    // ... 더 많은 데이터
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container sx={{ pt: '80px', pb: '3rem' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        관리자 대시보드
      </Typography>

      {/* 통계 카드 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ShoppingCart sx={{ color: '#4CAF50' }} />}
            title="오늘 주문"
            value="25"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LocalShipping sx={{ color: '#2196F3' }} />}
            title="배송 중"
            value="18"
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Person sx={{ color: '#FF9800' }} />}
            title="총 고객"
            value="156"
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoney sx={{ color: '#F44336' }} />}
            title="이번달 매출"
            value="₩2.5M"
            color="#F44336"
          />
        </Grid>
      </Grid>

      {/* 차트 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>주문 및 배송 현황</Typography>
            <LineChart width={800} height={300} data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" name="주문" />
              <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" name="배송" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '15px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>주문 상태 분포</Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={[
                  { name: '배송완료', value: 45 },
                  { name: '배송중', value: 25 },
                  { name: '주문확인', value: 20 },
                  { name: '준비중', value: 10 }
                ]}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {orderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      {/* 고객 주문 테이블 */}
      <Paper sx={{ p: 3, borderRadius: '15px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>고객 주문 현황</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>고객명</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell align="right">총 주문 횟수</TableCell>
                <TableCell align="right">총 주문 액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerOrders.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell align="right">{customer.totalOrders}회</TableCell>
                  <TableCell align="right">
                    {customer.totalAmount.toLocaleString()}원
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 