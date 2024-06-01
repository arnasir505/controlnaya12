export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface Photo {
  _id: string;
  title: string;
  image: string;
  author: Author;
}

export interface Author {
  _id: string;
  displayName: string;
}

export interface PhotoMutation {
  title: string;
  image: File | null;
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  avatar: File | null;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
