import { settings } from '@config/settings';
import User from "@models/userauth.model";
import jwt from "jsonwebtoken";

const isAuth = async (req, res) => {
  const authorization = req.headers.authorization;
  let token;

  if (authorization &&
    authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  };
  if (!token) {
    return false
  };
  interface JWT_TOKEN {
    email: string
  }
  const tokenDecode: JWT_TOKEN = await new Promise((resolve, reject) => {
    jwt.verify(token, settings.JWT.JWT_SECRET, (err, payload) => {
      err ? reject(err) : resolve(payload);
    });
  });
  const user = User.findOne({ email: tokenDecode.email })
  req.user = user;
  return true
}

export default isAuth