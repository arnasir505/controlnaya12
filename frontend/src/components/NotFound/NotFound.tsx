import { Grid, Typography } from '@mui/material';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        gap: 1,
        pt: 10,
        pb: 5,
      }}
    >
      <Grid item sx={{ maxWidth: '300px' }}>
        <img
          src='https://i.imgur.com/A040Lxr.png'
          alt='Not Found'
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }}>
        <Typography
          variant='h1'
          sx={{ fontWeight: '600', letterSpacing: '4px', mt: 6 }}
        >
          404
        </Typography>
        <Typography
          variant='body1'
          sx={{ fontWeight: '500', fontSize: '1.2rem' }}
        >
          This page couldn't be found.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
