import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { fetchPhotos } from '../../store/photos/photosThunks';

const UserGallery: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const getPhotosByAuthor = async () => {
    const author = searchParams.get('author');
    if (author) {
      await dispatch(fetchPhotos(author));
    }
  };

  useEffect(() => {
    void getPhotosByAuthor();
  }, []);
  
  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4'>User Gallery</Typography>
        <Button variant='outlined'>Upload new photo</Button>
      </Box>
    </Container>
  );
};

export default UserGallery;
