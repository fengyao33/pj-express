import { settings } from '@config/settings';
import jwt from 'jsonwebtoken';

const generateJWT = (email: string) => {
  try {
    const token = jwt.sign(
      { email },
      settings.JWT.JWT_SECRET,
      { expiresIn: settings.JWT.JWT_EXPIRE_DAYS })
    return token
  } catch (error: any) {
    throw new Error(error.message)
  }
}


export default generateJWT;