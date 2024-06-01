import { createSlice } from '@reduxjs/toolkit';
import { Photo, ValidationError } from '../../types';
import { fetchPhotos } from './photosThunks';

interface PhotosState {
  photos: Photo[];
  photosLoading: boolean;
  photosError: boolean;
  addPhotoError: ValidationError | null;
  addPhotoLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  photosLoading: false,
  photosError: false,
  addPhotoError: null,
  addPhotoLoading: false,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.photosLoading = true;
        state.photosError = false;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.photosLoading = false;
        state.photos = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.photosLoading = false;
        state.photosError = true;
      });
  },
});

export const photosReducer = photosSlice.reducer;
