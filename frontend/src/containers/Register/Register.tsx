import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectRegisterError,
  selectRegisterLoading,
} from '../../store/users/usersSlice';
import { register } from '../../store/users/usersThunk';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../components/FileInput/FileInput';
import { useState } from 'react';
import { RegisterMutation } from '../../types';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterMutation>({
    email: '',
    displayName: '',
    avatar: null,
    password: '',
  });
  const [fileName, setFileName] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      setRegisterForm((prevState) => ({ ...prevState, avatar: files[0] }));
    } else {
      setRegisterForm((prevState) => ({ ...prevState, avatar: null }));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register(registerForm)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={onFormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type='email'
                label='Email'
                name='email'
                autoComplete='new-email'
                value={registerForm.email}
                onChange={onInputChange}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label='Name'
                name='displayName'
                autoComplete='new-name'
                value={registerForm.displayName}
                onChange={onInputChange}
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput
                onChange={onFileInputChange}
                name='avatar'
                label='Avatar'
                error={error}
                fileName={fileName}
                changeFilename={setFileName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name='password'
                label='Password'
                type='password'
                autoComplete='new-password'
                value={registerForm.password}
                onChange={onInputChange}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
