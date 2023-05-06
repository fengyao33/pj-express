import { Response } from 'express';

const successHandler = (res: Response, result: object, statusCode: number = 200) => {
  res.status(statusCode).json({
    status: 'success',
    data: result,
  });
};

export default successHandler;