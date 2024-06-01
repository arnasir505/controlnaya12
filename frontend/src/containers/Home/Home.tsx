import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPhotos } from '../../store/photos/photosThunks';
import { Box, Container, Grid, Icon, Typography } from '@mui/material';
import {
  selectPhotos,
  selectPhotosLoading,
} from '../../store/photos/photosSlice';
import Spinner from '../../components/Spinner/Spinner';
import { apiUrl } from '../../constants';
import CollectionsIcon from '@mui/icons-material/Collections';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const loading = useAppSelector(selectPhotosLoading);
  const getPhotos = async () => {
    await dispatch(fetchPhotos());
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
              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            />
            <Typography variant='body1' sx={{ fontWeight: '600', mt: 0.5 }}>
              {photo.title}
            </Typography>
            <Typography variant='body2' sx={{ color: '#818181' }}>
              by {photo.author.displayName}
            </Typography>
          </Grid>
        ))}
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
