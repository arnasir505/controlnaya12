import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} is missing. Skipping drop...`);
  }
};

const collections: string[] = ['users', 'photos'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [user1, user2, user3] = await User.create(
    {
      email: 'admin505@gmail.com',
      password: 'iLoveBishkek1234%',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Admin',
      avatar: 'fixtures/admin.jpg',
    },
    {
      email: 'usermaster@gmail.com',
      password: 'iLoveBishkek4321%',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'User',
      avatar: 'fixtures/user2.jpg',
    },
    {
      email: 'millie@gmail.com',
      password: 'iLoveBishkek5432%',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Millie',
      avatar: 'fixtures/user3.jpg',
    },
  );

  await Photo.create(
    {
      title: 'Kyrgyz Mountains',
      image: 'fixtures/bishkek-mountains.png',
      author: user1._id,
    },
    {
      title: 'Vogtsburg fields',
      image: 'fixtures/german-fields.jpg',
      author: user1._id,
    },
    {
      title: 'Beautiful Sunset',
      image: 'fixtures/sunset.jpg',
      author: user2._id,
    },
    {
      title: 'Road in Forest',
      image: 'fixtures/forest-road.jpg',
      author: user2._id,
    },
    {
      title: 'Wadi Rum, Aqaba, Jordan',
      image: 'fixtures/desert.jpg',
      author: user3._id,
    },
    {
      title: 'Chicago City',
      image: 'fixtures/chicago.jpg',
      author: user3._id,
    },
  );

  await db.close();
};

void run().catch(console.error);
