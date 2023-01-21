import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Box, Button, Container, TextField } from '@mui/material';

const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd })
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (error?.status === 401) {
        setErrMsg('Unauthorised');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <Container>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={user}
          ref={userRef}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <Button variant="contained" color="success" onClick={handleSubmit}>
          Sign In
        </Button>
        <p>
          Don't have an account?&nbsp;
          <span>
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </Box>
    </Container>
  );
};

export default Login;
