import { settings } from '@config/settings';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage';


const firebaseConfig = {
  type: settings.FIREBASE.TYPE,
  project_id: settings.FIREBASE.PROJECT_ID,
  private_key_id: settings.FIREBASE.PROJECT_KEY_ID,
  private_key: settings.FIREBASE.PROJECT_KEY,
  client_email:settings.FIREBASE.CLIENT_EMAIL,
  client_id: settings.FIREBASE.CLIENT_ID,
  auth_uri: settings.FIREBASE.AUTH_URL,
  token_uri: settings.FIREBASE.TOKEN_URL,
  auth_provider_x509_cert_url: settings.FIREBASE.AUTH_PROVIDER,
  client_x509_cert_url: settings.FIREBASE.CLIENT_URL,
  universe_domain: settings.FIREBASE.UNIVERSE,
}

const ServiceAccount = {
  clientEmail:settings.FIREBASE.CLIENT_EMAIL,
  private_key: settings.FIREBASE.PROJECT_KEY,
  project_id: settings.FIREBASE.PROJECT_ID,
}

const fileStore = initializeApp({
  credential: cert(ServiceAccount),
  storageBucket: '<BUCKET_NAME>.appspot.com'
})

const bucket = getStorage(fileStore).bucket();


export default bucket





