import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Photo } from '../../types';

export const fetchPhotos = createAsyncThunk<Photo[], string | null>(
  'photos/fetchAll',
  async (author) => {
    try {
      const response = await axiosApi.get<Photo[]>(
        author ? `/photos?author=${author}` : '/photos'
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);
