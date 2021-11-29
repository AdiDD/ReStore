import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router';
import agent from '../../app/api/agent';

import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

const Register = () => {
  const [values, setValues] = useState({
      username: "",
      email: "",
      password: ""
  });
  const [loading, setLoading] = useState(false);
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleApiErrors = (errors: any) => {
    setUsernameErrors([]);
    setEmailErrors([]);
    setPasswordErrors([]);

    const modelStateErrors: string[] = [];
    for (const key in errors) {
        modelStateErrors.push(errors[key])
    }

    modelStateErrors.flat().forEach((error) => {
        if (error.includes("Username")) setUsernameErrors(prevErrors => [...prevErrors, error])
        else if (error.includes("Email")) setEmailErrors(prevErrors => [...prevErrors, error])
        else if (error.includes("Password")) setPasswordErrors(prevErrors => [...prevErrors, error])
    });
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();  
    setLoading(true);
    agent.Account.register(values)
        .then(() => {
            dispatch(signInUser({username: values.username, password: values.password}));
            navigate("/catalog")
            toast.success("Registration successful!");
        })
        .catch(error => handleApiErrors(error.data.errors))
    setLoading(false);
    // navigate("/catalog");
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
                Register
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
                error={usernameErrors.length > 0}
                helperText={usernameErrors}
                />
                
                <TextField
                margin="normal"
                required
                fullWidth
                label="Email address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={values.email}
                error={emailErrors.length > 0}
                helperText={emailErrors}
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
                error={passwordErrors.length > 0}
                helperText={passwordErrors}
                />
                <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </LoadingButton>
                <Grid container>
                <Grid item>
                    <Link to="/login" >
                    {"Already have an account? Sign In!"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
          </Box>
      </Container>
  );
}

export default Register;