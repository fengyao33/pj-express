import { settings } from '@config/settings';
import * as admin from 'firebase-admin';

const config = {
  type: settings.FIREBASE.TYPE,
  project_id: settings.FIREBASE.PROJECT_ID,
  private_key_id: settings.FIREBASE.PRIVATE_KEY_ID,
  private_key: settings.FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email:settings.FIREBASE.CLIENT_EMAIL,
  client_id: settings.FIREBASE.CLIENT_ID,
  auth_uri: settings.FIREBASE.AUTH_URL,
  token_uri: settings.FIREBASE.TOKEN_URL,
  auth_provider_x509_cert_url: settings.FIREBASE.AUTH_PROVIDER,
  client_x509_cert_url: settings.FIREBASE.CLIENT_URL,
  universe_domain: settings.FIREBASE.UNIVERSE,
}

admin.initializeApp({
  credential: admin.credential.cert(config as admin.ServiceAccount),
  storageBucket: `${settings.FIREBASE.PROJECT_ID}.appspot.com`
})

export default admin





