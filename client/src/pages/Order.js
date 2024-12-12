import React from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardMedia, Button, Box, Rating, styled 
} from '@mui/material';
import { ShoppingCart, LocalShipping } from '@mui/icons-material';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
});

const ProductImage = styled(CardMedia)({
  height: 250,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
  },
});

const OrderButton = styled(Button)({
  marginTop: 'auto',
  padding: '10px',
  borderRadius: '8px',
});

const Order = () => {
  const products = [
    {
      id: 1,
      name: '프리미엄 초당옥수수 세트',
      price: '39,900원',
      description: '엄선된 최상급 초당옥수수 10개입',
      image: '/corn-premium.jpg',
      rating: 5,
      shipping: '무료배송',
    },
    {
      id: 2,
      name: '일반 초당옥수수 세트',
      price: '29,900원',
      description: '맛있는 초당옥수수 10개입',
      image: '/corn-standard.jpg',
      rating: 4.5,
      shipping: '무료배송',
    },
    {
      id: 3,
      name: '미니 초당옥수수 세트',
      price: '19,900원',
      description: '맛있는 초당옥수수 5개입',
      image: '/corn-mini.jpg',
      rating: 4.5,
      shipping: '3,000원',
    },
  ];

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
          marginBottom: '2rem'
        }}
      >
        초당옥수수 주문
      </Typography>
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <StyledCard>
              <ProductImage
                image={product.image}
                title={product.name}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  paragraph
                >
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({product.rating})
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalShipping sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {product.shipping}
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  {product.price}
                </Typography>
                <OrderButton 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCart />}
                >
                  장바구니 담기
                </OrderButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Order; 