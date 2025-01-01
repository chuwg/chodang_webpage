import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Grid, Paper, Typography, Box, Table,
  TableBody, TableCell, TableHead, TableRow, TableContainer,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Tab, Tabs, IconButton, Alert, MenuItem
} from '@mui/material';
import { Delete, Edit, ShoppingCart, LocalShipping, Person, AttachMoney } from '@mui/icons-material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

// API 인스턴스 설정
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 수정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = token;  // 이미 'Bearer '가 포함되어 있음
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 수정
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증 에러:', error.response.data);
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 상품 카테고리 enum 정의 수정 - 대문자로 변경
const PRODUCT_CATEGORIES = [
  { value: 'FOOD', label: '식품' },
  { value: 'ELECTRONICS', label: '전자제품' },
  { value: 'CLOTHING', label: '의류' },
  { value: 'BOOKS', label: '도서' },
  { value: 'BEAUTY', label: '뷰티' },
  { value: 'SPORTS', label: '스포츠용품' },
  { value: 'HOME', label: '홈/리빙' },
  { value: 'OTHER', label: '기타' }
];

function TabPanel({ children, value, index }) {
  return (
    <div 
      role="tabpanel"
      hidden={value !== index}
      style={{ 
        display: value === index ? 'block' : 'none',
        width: '100%'
      }}
    >
      {value === index && (
        <Box sx={{ p: 2, width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'OTHER', // 대문자로 변경
    image: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // 대시보드 데이터
  const orderData = [
    { date: '2024-01-01', orders: 15, deliveries: 12 },
    { date: '2024-01-02', orders: 20, deliveries: 18 },
    { date: '2024-01-03', orders: 25, deliveries: 22 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const pieChartData = [
    { name: '배송완료', value: 45 },
    { name: '배송중', value: 25 },
    { name: '주문확인', value: 20 },
    { name: '준비중', value: 10 }
  ];

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('회원 목록 조회 에러:', error);
      showAlert('회원 목록을 불러오는데 실패했습니다.', 'error');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('상품 목록 조회 에러:', error);
      showAlert('상품 목록을 불러오는데 실패했습니다.', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('정말 이 회원을 삭제하시겠습니까?')) return;
    
    try {
      await api.delete(`/api/admin/users/${userId}`);
      showAlert('회원이 삭제되었습니다.', 'success');
      fetchUsers();
    } catch (error) {
      console.error('회원 삭제 에러:', error);
      showAlert('회원 삭제에 실패했습니다.', 'error');
    }
  };

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      // 데이터 검증
      if (!productForm.name || !productForm.description || !productForm.price || !productForm.stock) {
        showAlert('모든 필수 항목을 입력해주세요.', 'error');
        return;
      }

      const formData = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        category: productForm.category.toUpperCase()
      };

      let response;
      if (selectedProduct) {
        response = await api.put(`/api/products/${selectedProduct._id}`, formData);
      } else {
        response = await api.post('/api/products', formData);
      }

      if (response.data.success) {
        showAlert(
          selectedProduct ? '상품이 수정되었습니다.' : '상품이 등록되었습니다.',
          'success'
        );
        setOpenProductDialog(false);
        resetProductForm();
        fetchProducts();
      }
    } catch (error) {
      console.error('상품 저장 에러:', error.response?.data || error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }
      
      showAlert(
        error.response?.data?.message || '상품 저장에 실패했습니다.',
        'error'
      );
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('정말 이 상품을 삭제하시겠습니까?')) return;
    
    try {
      await api.delete(`/api/products/${productId}`);
      showAlert('상품이 삭제되었습니다.', 'success');
      fetchProducts();
    } catch (error) {
      showAlert('상품 삭제에 실패했습니다.', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category?.toUpperCase() || 'OTHER', // 대문자로 변환
      image: product.image || ''
    });
    setOpenProductDialog(true);
  };

  const resetProductForm = () => {
    setSelectedProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'OTHER', // 대문자로 변경
      image: ''
    });
  };

  const showAlert = (message, severity) => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 3000);
  };

  // 카테고리 value로부터 label을 찾는 helper 함수 추가
  const getCategoryLabel = (categoryValue) => {
    const category = PRODUCT_CATEGORIES.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  // 회원 목록 테이블 렌더링
  const renderUsersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>주소</TableCell>
            <TableCell>가입일</TableCell>
            <TableCell>작업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ 
      pt: '80px',
      pb: '3rem',
      '& .MuiPaper-root': {
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }
    }}>
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Paper sx={{ mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="대시보드" />
          <Tab label="회원 관리" />
          <Tab label="상품 관리" />
        </Tabs>
      </Paper>

      {/* 대시보드 탭 */}
      <TabPanel value={tabValue} index={0}>
        {/* 통계 카드 섹션 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography color="textSecondary" gutterBottom>오늘 주문</Typography>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>25건</Typography>
              <ShoppingCart sx={{ color: '#4CAF50', fontSize: 40 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography color="textSecondary" gutterBottom>배송 중</Typography>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>18건</Typography>
              <LocalShipping sx={{ color: '#2196F3', fontSize: 40 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography color="textSecondary" gutterBottom>총 회원수</Typography>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>156명</Typography>
              <Person sx={{ color: '#FF9800', fontSize: 40 }} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography color="textSecondary" gutterBottom>이번달 매출</Typography>
              <Typography variant="h3" component="div" sx={{ mb: 2 }}>₩2.5M</Typography>
              <AttachMoney sx={{ color: '#F44336', fontSize: 40 }} />
            </Paper>
          </Grid>
        </Grid>

        {/* 차트 섹션 */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '400px' }}>
              <Typography variant="h6" gutterBottom>주문 및 배송 현황</Typography>
              <Box sx={{ width: '100%', height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer>
                  <LineChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" name="주문" />
                    <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" name="배송" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '400px' }}>
              <Typography variant="h6" gutterBottom>주문 상태 분포</Typography>
              <Box sx={{ width: '100%', height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* 회원 관리 탭 */}
      <TabPanel value={tabValue} index={1}>
        {renderUsersTable()}
      </TabPanel>

      {/* 상품 관리 탭 */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              resetProductForm();
              setOpenProductDialog(true);
            }}
          >
            상품 등록
          </Button>
        </Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>상품명</TableCell>
                  <TableCell>설명</TableCell>
                  <TableCell>가격</TableCell>
                  <TableCell>재고</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price.toLocaleString()}원</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{getCategoryLabel(product.category)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* 상품 등록/수정 다이얼로그 */}
      <Dialog 
        open={openProductDialog} 
        onClose={() => {
          setOpenProductDialog(false);
          resetProductForm();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedProduct ? '상품 수정' : '상품 등록'}
        </DialogTitle>
        <form onSubmit={handleProductSubmit}>
          <DialogContent>
            <TextField
              name="name"
              label="상품명"
              value={productForm.name}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="description"
              label="상품 설명"
              value={productForm.description}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              name="price"
              label="가격"
              type="number"
              value={productForm.price}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="stock"
              label="재고"
              type="number"
              value={productForm.stock}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              select
              name="category"
              label="카테고리"
              value={productForm.category}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="image"
              label="이미지 URL"
              value={productForm.image}
              onChange={handleProductChange}
              fullWidth
              required
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenProductDialog(false);
              resetProductForm();
            }}>
              취소
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedProduct ? '수정' : '등록'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;