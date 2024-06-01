import { ObjectId } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface PhotoFields {
  image: string;
  title: string;
  author: ObjectId;
}
