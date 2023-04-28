import { Response } from 'express';

const successHandler = (res: Response, result: object) => {
  res.status(200).json({
    status: 'success',
    data: result,
  });
};

export default successHandler;