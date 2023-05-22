import { Response } from 'express';

const successHandler = (res: Response, result: object, statusCode: number = 200, tableParams: object = {}) => {
  res.status(statusCode).json({
    status: 'success',
    data: result,
    ...tableParams
  });
};

export default successHandler;