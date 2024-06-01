import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Author, Photo, PhotoMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const addNewPhoto = createAsyncThunk<
  Photo,
  PhotoMutation,
  { rejectValue: ValidationError }
>('photos/add', async (photoForm, { rejectWithValue }) => {
  try {
    const { title, image } = photoForm;
    const formData = new FormData();

    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }
    const response = await axiosApi.post<Photo>('/photos', formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const fetchPhotos = createAsyncThunk<Photo[], string | null>(
  'photos/fetchAll',
  async (author) => {
    try {
      const response = await axiosApi.get<Photo[]>(
        author ? `/photos?author=${author}` : '/photos',
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  },
);

export const fetchGalleryAuthor = createAsyncThunk<Author, string>(
  'photos/fetchAuthor',
  async (authorID) => {
    try {
      const response = await axiosApi.get<Author>('/users/' + authorID);
      return response.data;
    } catch (e) {
      throw e;
    }
  },
);

export const deletePhoto = createAsyncThunk<void, string>(
  'photos/deleteOne',
  async (id) => {
    try {
      await axiosApi.delete('/photos/' + id);
    } catch (e) {
      throw e;
    }
  },
);

export const deletePhotoByUser = createAsyncThunk<void, string>(
  'photos/deleteOneByUser',
  async (id) => {
    try {
      await axiosApi.delete('/photos/' + id + '/byUser');
    } catch (e) {
      throw e;
    }
  },
);
