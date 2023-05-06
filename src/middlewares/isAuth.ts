import { settings } from '@config/settings';
import { ErrorHandler, handleErrorMiddleware } from '@middlewares/error_handler';
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  const authorization: string = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer')) {
    handleErrorMiddleware(new ErrorHandler(401, "使用者未登入"), req, res, next)
  }
  const token = authorization.split(' ')[1]
  interface JwtToken {
    email: string,
    iat: number,
    exp: number
  }

  const tokenDecode: JwtToken = await new Promise((resolve, reject) => {
    jwt.verify(token, settings.JWT.JWT_SECRET, (error, payload) => {
      if (error) {
        reject(error)
        return handleErrorMiddleware(new ErrorHandler(401, 'JWT Token驗證失敗'), req, res, next)
      } else {
        resolve(payload)
      }
    });
  });
  const { email, exp } = tokenDecode
  if (Date.now() >= exp * 1000) {
    return handleErrorMiddleware(new ErrorHandler(401, 'JWT Token過期'), req, res, next)
  }
  // 目前沒有其他驗證token為當下的使用者所有的設計，後續需要增加。
  if (req.body.email !== email) {
    return handleErrorMiddleware(new ErrorHandler(401, 'JWT Token驗證失敗'), req, res, next)
  }
  next()
}

export default isAuth