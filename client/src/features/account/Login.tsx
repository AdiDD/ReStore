import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router';

import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const [values, setValues] = useState({
      username: "",
      password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();  
    setLoading(true);
    await dispatch(signInUser(values));
    setLoading(false);
    navigate("/catalog");
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValues({...values, [name]: value});
  };

  return (
      <Container component={Paper} maxWidth="sm">
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleInputChange}
                value={values.username}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={values.password}
                />
                <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </LoadingButton>
                <Grid container>
                <Grid item>
                    <Link to="/register" >
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
          </Box>
      </Container>
  );
}

export default Login;