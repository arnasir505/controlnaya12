import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Photo from '../models/Photo';
import { clearImage, imagesUpload } from '../multer';
import mongoose from 'mongoose';
import permit from '../middleware/permit';

const photosRouter = express.Router();

photosRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const photo = new Photo({
        title: req.body.title,
        image: req.file?.filename,
        author: req.user?._id,
      });

      await photo.save();
      return res.status(201).send(photo);
    } catch (e) {
      if (req.file) {
        clearImage(req.file.filename);
      }
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  },
);

photosRouter.get('/', async (req, res, next) => {
  try {
    const authorID = req.query.author;
    if (authorID) {
      if (!mongoose.Types.ObjectId.isValid(authorID.toString())) {
        return res.status(422).send({ error: 'Invalid author!' });
      }
      const photos = await Photo.find({ author: authorID.toString() }).populate(
        'author',
        'displayName',
      );
      return res.send(photos);
    }
    const photos = await Photo.find().populate('author', 'displayName');
    return res.send(photos);
  } catch (e) {
    next(e);
  }
});

photosRouter.delete(
  '/:id/byUser',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;
      const photo = await Photo.findOneAndDelete({
        _id: id,
        author: req.user?._id,
      });
      if (!photo) {
        return res.status(404).send({ error: 'Not Found' });
      }
      clearImage(photo.image);
      return res.send({ message: 'Deleted' });
    } catch (e) {
      next(e);
    }
  },
);

photosRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const photo = await Photo.findByIdAndDelete(id);
    if (!photo) {
      return res.status(404).send({ error: 'Not Found' });
    }
    clearImage(photo.image);
    return res.send({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
});

export default photosRouter;
