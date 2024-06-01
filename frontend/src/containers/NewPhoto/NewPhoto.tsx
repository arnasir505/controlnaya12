import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAddPhotoError,
  selectAddPhotoLoading,
} from '../../store/photos/photosSlice';
import { PhotoMutation } from '../../types';
import { LoadingButton } from '@mui/lab';
import { addNewPhoto } from '../../store/photos/photosThunks';
import { useNavigate } from 'react-router-dom';

const NewPhoto: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAddPhotoError);
  const loading = useAppSelector(selectAddPhotoLoading);
  const [photoForm, setPhotoForm] = useState<PhotoMutation>({
    title: '',
    image: null,
  });
  const [fileName, setFileName] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhotoForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      setPhotoForm((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setPhotoForm((prevState) => ({ ...prevState, image: null }));
    }
  };

  const clearPhotoForm = () => {
    setPhotoForm({
      title: '',
      image: null,
    });
    setFileName('');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onPhotoFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewPhoto(photoForm)).unwrap();
    clearPhotoForm();
    navigate('/');
  };

  return (
    <Container sx={{ py: 5 }} maxWidth='sm'>
      <Typography variant='h4' sx={{ mb: 2, fontWeight: '500' }}>
        Upload New Photo
      </Typography>
      <Box component='form' onSubmit={onPhotoFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <FileInput
              name='image'
              label='Photo'
              error={error}
              fileName={fileName}
              onChange={onFileInputChange}
              changeFilename={setFileName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label='Title'
              name='title'
              autoComplete='new-title'
              value={photoForm.title}
              onChange={onInputChange}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant='contained' type='submit' loading={loading}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewPhoto;
