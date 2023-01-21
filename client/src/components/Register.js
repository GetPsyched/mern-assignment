import { Box, Button, Container, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(REGISTER_URL, JSON.stringify({ user, pwd }));
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <Container>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
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

            <TextField
              id="confirm_password"
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
            />

            <Button
              disabled={!validMatch}
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <p>
              Already registered?
              <br />
              <span className="line">
                <Link to="/">Sign In</Link>
              </span>
            </p>
          </Box>
        </section>
      )}
    </Container>
  );
};

export default Register;
