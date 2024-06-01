import { Box, Button, Container, Grid, Icon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPhotos } from '../../store/photos/photosThunks';
import {
  selectPhotos,
  selectPhotosLoading,
} from '../../store/photos/photosSlice';
import Spinner from '../../components/Spinner/Spinner';
import { apiUrl } from '../../constants';
import PhotoDialog from '../../components/Dialog/Dialog';
import CollectionsIcon from '@mui/icons-material/Collections';
import { selectUser } from '../../store/users/usersSlice';

const UserGallery: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const getPhotosByAuthor = async () => {
    const author = searchParams.get('author');
    if (author) {
      await dispatch(fetchPhotos(author));
    }
  };

  const handleClickOpen = (url: string) => {
    setOpen(true);
    setPhotoUrl(url);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    void getPhotosByAuthor();
  }, []);

  let content = <Spinner />;

  if (photos.length > 0 && !loading) {
    content = (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h4'>
            {photos[0].author.displayName}'s Gallery
          </Typography>
          {photos[0].author._id === user?._id ? (
            <Button variant='outlined'>Upload new photo</Button>
          ) : null}
        </Box>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ sm: 2, md: 3, lg: 4 }}
          sx={{ mt: 2 }}
        >
          {photos.map((photo) => (
            <Grid
              item
              sx={{ textAlign: 'center' }}
              key={photo._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <img
                src={apiUrl + '/' + photo.image}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => handleClickOpen(photo.image)}
              />
              <Typography variant='body1' sx={{ fontWeight: '600', mt: 0.5 }}>
                {photo.title}
              </Typography>
            </Grid>
          ))}
          <PhotoDialog open={open} onClose={handleClose} photo={photoUrl} />
        </Grid>
      </>
    );
  } else if (photos.length === 0 && !loading) {
    content = (
      <Box textAlign={'center'}>
        <Icon sx={{ height: '50px', width: '50px' }}>
          <CollectionsIcon
            sx={{ height: '100%', width: '100%' }}
            color='action'
          />
        </Icon>
        <Typography variant='h5' mt={1} color='#757575'>
          No Photos Yet.
        </Typography>
      </Box>
    );
  }

  return <Container sx={{ py: 5 }}>{content}</Container>;
};

export default UserGallery;
