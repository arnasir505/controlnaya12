import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} color='secondary' />
    </Box>
  );
};

export default Spinner;
