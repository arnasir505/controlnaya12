import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Photo } from '../../types';

export const fetchPhotos = createAsyncThunk<Photo[]>('photos/fetchAll', async () => {
  try {
    const response = await axiosApi.get<Photo[]>('/photos');
    return response.data;
  } catch (e) {
    throw e;
  }
});
