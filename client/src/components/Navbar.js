import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Button, Box, Container, 
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme, styled, Typography 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home, 
  Info, 
  ShoppingCart, 
  PersonAdd,
  Person,
  Login as LoginIcon,
  Close,
  AdminPanelSettings
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 스타일링된 컴포넌트
const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(145deg, #2E7D32 0%, #1B5E20 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)(({ active }) => ({
  color: '#FFFFFF',
  margin: '0 8px',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '5px',
    left: '50%',
    transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
    transformOrigin: 'center',
    width: '80%',
    height: '2px',
    background: '#FDD835',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    '&:after': {
      transform: 'translateX(-50%) scaleX(1)',
    },
  },
}));

const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#FFFFFF',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  '& img': {
    marginRight: '10px',
    height: '30px',
  },
});

const DrawerHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  background: '#2E7D32',
  color: '#FFFFFF',
});

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: '250px',
  },
});

const StyledListItem = styled(ListItem)({
  margin: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#E8F5E9',
  },
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('adminToken');
  const isUser = localStorage.getItem('userToken');
  const isLoggedIn = !!(isAdmin || isUser);  // 관리자나 일반 사용자 로그인 체크

  // 기본 메뉴 아이템에 관리자 메뉴 조건부 추가
  const baseMenuItems = [
    { text: '홈', path: '/', icon: <Home /> },
    { text: '초당옥수수 이야기', path: '/about', icon: <Info /> },
    { text: '옥수수 주문', path: '/order', icon: <ShoppingCart /> },
    ...(isAdmin ? [{ text: '관리자', path: '/admin/dashboard', icon: <AdminPanelSettings /> }] : []),
  ];

  // 로그인 상태에 따른 추가 메뉴 아이템
  const authMenuItems = isLoggedIn
    ? [{ text: '내정보', path: '/mypage', icon: <Person /> }]
    : [
        { text: '로그인', path: '/login', icon: <LoginIcon /> },
        { text: '회원가입', path: '/signup', icon: <PersonAdd /> }
      ];

  // 전체 메뉴 아이템
  const menuItems = [...baseMenuItems, ...authMenuItems];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // 모든 토큰 제거
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    
    // 홈으로 리다이렉트
    navigate('/');
  };

  const drawer = (
    <>
      <DrawerHeader>
        <Logo>초당옥수수</Logo>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ color: '#FFFFFF' }}
        >
          <Close />
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item) => (
          <StyledListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
          >
            <Box sx={{ mr: 2, color: '#2E7D32' }}>{item.icon}</Box>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
        {isLoggedIn && (
          <StyledListItem 
            button 
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 82, 82, 0.1)',
              },
            }}
          >
            <Box sx={{ mr: 2, color: '#2E7D32' }}>
              <LoginIcon sx={{ transform: 'rotate(180deg)' }} />
            </Box>
            <ListItemText primary="로그아웃" />
          </StyledListItem>
        )}
      </List>
    </>
  );

  return (
    <StyledAppBar 
      position="fixed" 
      sx={{
        backgroundColor: scrolled ? '#2E7D32' : 'transparent',
        boxShadow: scrolled ? 3 : 0,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo component={Link} to="/">
            초당옥수수
          </Logo>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {baseMenuItems.map((item) => (
                <StyledButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  active={location.pathname === item.path ? 1 : 0}
                  startIcon={item.icon}
                >
                  {item.text}
                </StyledButton>
              ))}
              {isLoggedIn ? (
                <>
                  {!isAdmin && (
                    <StyledButton
                      component={Link}
                      to="/mypage"
                      active={location.pathname === '/mypage' ? 1 : 0}
                      startIcon={<Person />}
                    >
                      내정보
                    </StyledButton>
                  )}
                  <StyledButton
                    onClick={handleLogout}
                    startIcon={<LoginIcon sx={{ transform: 'rotate(180deg)' }} />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.1)',
                      },
                    }}
                  >
                    {isAdmin ? '관리자 로그아웃' : '로그아웃'}
                  </StyledButton>
                </>
              ) : (
                <>
                  <StyledButton
                    component={Link}
                    to="/login"
                    active={location.pathname === '/login' ? 1 : 0}
                    startIcon={<LoginIcon />}
                  >
                    로그인
                  </StyledButton>
                  <StyledButton
                    component={Link}
                    to="/signup"
                    active={location.pathname === '/signup' ? 1 : 0}
                    startIcon={<PersonAdd />}
                  >
                    회원가입
                  </StyledButton>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>

      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader>
          <Logo>
            {isAdmin ? '관리자 모드' : '초당옥수수'}
          </Logo>
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{ color: '#FFFFFF' }}
          >
            <Close />
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <StyledListItem 
              button 
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
            >
              <Box sx={{ mr: 2, color: '#2E7D32' }}>{item.icon}</Box>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
          {isLoggedIn && (
            <StyledListItem 
              button 
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 82, 82, 0.1)',
                },
              }}
            >
              <Box sx={{ mr: 2, color: '#2E7D32' }}>
                <LoginIcon sx={{ transform: 'rotate(180deg)' }} />
              </Box>
              <ListItemText primary={isAdmin ? '관리자 로그아웃' : '로그아웃'} />
            </StyledListItem>
          )}
        </List>
      </StyledDrawer>
    </StyledAppBar>
  );
};

export default Navbar; 