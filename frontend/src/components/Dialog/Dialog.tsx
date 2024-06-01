import { Box, Button, Dialog } from '@mui/material';
import React from 'react';
import { apiUrl } from '../../constants';

interface Props {
  open: boolean;
  onClose: () => void;
  photo: string;
}

const PhotoDialog: React.FC<Props> = ({ photo, open, onClose }) => {
  return (
    <Dialog
      open={open}
      maxWidth='lg'
      onClose={onClose}
      sx={{ textAlign: 'center' }}
    >
      <Box sx={{ p: 5, pb: 1 }}>
        <img
          src={apiUrl + '/' + photo}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
        <Button onClick={onClose}>close</Button>
      </Box>
    </Dialog>
  );
};

export default PhotoDialog;
