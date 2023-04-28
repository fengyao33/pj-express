import jwt from 'jsonwebtoken';
import { settings } from '@config/settings';

const generateJWT = (email: string) => {
  const token = jwt.sign(
    { email },
    settings.JWT.JWT_SECRET,
    { expiresIn: settings.JWT.JWT_EXPIRE_DAYS })
  return token
}


export default generateJWT;