import useAuth from '../hooks/useAuth.js';
import TemporaryDrawer from './Drawer.js';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <TemporaryDrawer />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MERN Assignment
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: 'right' }}
        >
          You're logged in as: {auth.user}&nbsp;
        </Typography>
        <Button onClick={logout} color="inherit">
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
