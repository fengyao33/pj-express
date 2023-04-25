import mongoose from 'mongoose';
import { settings } from '../config/settings';

const DB = `${settings.DB.URI}${settings.DB.NAME}`
mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log('MongoDB Connection Success!'))
  .catch(error => console.log(error));
