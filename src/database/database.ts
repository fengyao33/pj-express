import { settings } from '@config/settings';
import mongoose from 'mongoose';

mongoose
  .connect(settings.DB.URI!, {
    serverSelectionTimeoutMS: 5000,
    dbName: settings.DB.NAME
  })
  .then((db) => console.log('Mongo is online...'))
  .catch((error) => console.error(error));
