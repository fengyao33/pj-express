import { settings } from '@config/settings';
import User from "@models/user.model";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  const authorization: string = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({
      status: "fail",
      message: "使用者未登入"
    })
  }
  if (!authorization.startsWith('Bearer')) {
    res.status(401).json({
      status: "fail",
      message: "使用者未登入"
    })
  }
  const token = authorization.split(' ')[1]
  interface JwtToken {
    email: string
  }
  const tokenDecode: JwtToken = await new Promise((resolve, reject) => {
    jwt.verify(token, settings.JWT.JWT_SECRET, (err, payload) => {
      err ? reject(err) : resolve(payload);
    });
  });
  const user = User.findOne({ email: tokenDecode.email })
  req.user = user;
  next()
}

export default isAuth