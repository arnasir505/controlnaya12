import multer from 'multer';
import { extname, resolve } from 'path';
import config from './config';
import { promises as fs, unlink } from 'fs';
import { randomUUID } from 'crypto';

const avatarsStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = resolve(config.publicPath, 'avatars');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename(_req, file, cb) {
    const ext = extname(file.originalname);
    cb(null, 'avatars/' + randomUUID() + ext);
  },
});

const imagesStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = resolve(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename(_req, file, cb) {
    const ext = extname(file.originalname);
    cb(null, 'images/' + randomUUID() + ext);
  },
});

export const avatarsUpload = multer({ storage: avatarsStorage });
export const imagesUpload = multer({ storage: imagesStorage });

export const clearImage = (imageName: string) => {
  unlink(resolve(config.publicPath, imageName), (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('File does not exist.');
      } else {
        throw err;
      }
    } else {
      console.log('File deleted!');
    }
  });
};
