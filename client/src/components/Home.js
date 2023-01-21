import { Typography } from '@mui/material';
import NavBar from './NavBar.js';

const Home = () => {
  return (
    <>
      <NavBar />
      <Typography
        variant="h4"
        component="div"
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        You're on the home page. Click the hamburger icon on the top left to
        navigate to the other pages
      </Typography>
    </>
  );
};

export default Home;
