import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePhoto, fetchPhotos } from '../../store/photos/photosThunks';
import { Box, Container, Grid, Icon, Typography } from '@mui/material';
import {
  selectPhotos,
  selectPhotosLoading,
} from '../../store/photos/photosSlice';
import Spinner from '../../components/Spinner/Spinner';
import { apiUrl } from '../../constants';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhotoDialog from '../../components/Dialog/Dialog';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/users/usersSlice';
import { LoadingButton } from '@mui/lab';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);
  const [open, setOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [disabledBtn, setDisabledBtn] = useState('');

  const getPhotos = async () => {
    await dispatch(fetchPhotos(null));
  };

  const handleClickOpen = (url: string) => {
    setOpen(true);
    setPhotoUrl(url);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPhotoDelete = async (id: string) => {
    let adminConfirm = confirm('Delete this photo?');
    if (adminConfirm) {
      setDisabledBtn(id);
      await dispatch(deletePhoto(id));
      setDisabledBtn('');
      void getPhotos();
    }
  };

  useEffect(() => {
    void getPhotos();
  }, []);

  let content = <Spinner />;

  if (photos.length > 0 && !loading) {
    content = (
      <Grid container rowSpacing={3} columnSpacing={{ sm: 2, md: 3, lg: 4 }}>
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
            <Typography variant='body2' sx={{ color: '#818181' }}>
              by{' '}
              <Link
                to={`/gallery?author=${photo.author._id}`}
                style={{ color: 'inherit' }}
              >
                {photo.author.displayName}
              </Link>
            </Typography>
            {user?.role === 'admin' && (
              <LoadingButton
                variant='outlined'
                color='error'
                sx={{ mt: 1 }}
                onClick={() => onPhotoDelete(photo._id)}
                loading={photo._id === disabledBtn}
              >
                delete
              </LoadingButton>
            )}
          </Grid>
        ))}
        <PhotoDialog open={open} onClose={handleClose} photo={photoUrl} />
      </Grid>
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

  return <Container sx={{ py: 7 }}>{content}</Container>;
};

export default Home;
