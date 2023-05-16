import { settings } from '@config/settings'
import mongoose from 'mongoose'

// test2++
mongoose
  .connect(settings.DB.URI!, {
    serverSelectionTimeoutMS: 5000
  })
  .then((db) => console.log('Mongo is online...'))
  .catch((error) => console.error(error))

