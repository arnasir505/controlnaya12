import { Schema, Types, model } from 'mongoose';
import { PhotoFields } from '../types';
import User from './User';

const PhotoSchema = new Schema<PhotoFields>(
  {
    title: {
      type: String,
      required: [true, 'Please enter title.'],
    },
    image: {
      type: String,
      required: [true, 'Please upload a photo.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => User.findById(id),
        message: 'User does not exist.',
      },
    },
  },
  { versionKey: false },
);

const Photo = model('Photo', PhotoSchema);
export default Photo;
