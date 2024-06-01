import { createSlice } from '@reduxjs/toolkit';
import { Photo, ValidationError } from '../../types';
import { addNewPhoto, fetchPhotos } from './photosThunks';
import { RootState } from '../../app/store';

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
    builder
      .addCase(addNewPhoto.pending, (state) => {
        state.addPhotoLoading = true;
        state.addPhotoError = null;
      })
      .addCase(addNewPhoto.fulfilled, (state) => {
        state.addPhotoLoading = false;
      })
      .addCase(addNewPhoto.rejected, (state, { payload: error }) => {
        state.addPhotoLoading = false;
        state.addPhotoError = error || null;
      });
  },
});

export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectPhotosLoading = (state: RootState) =>
  state.photos.photosLoading;
export const selectAddPhotoError = (state: RootState) =>
  state.photos.addPhotoError;
export const selectAddPhotoLoading = (state: RootState) =>
  state.photos.addPhotoLoading;

export const photosReducer = photosSlice.reducer;
