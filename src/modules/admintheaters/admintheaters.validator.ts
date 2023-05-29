import { check } from 'express-validator';

export const storeValidators = [
  check('phone')
    // .matches(/^0\d{1}\-\d{7}$/)
    .matches(/^0[1-9]\d{7,10}$/)
    .withMessage('phone 格式錯誤 ex:02-1234567'),
];

export const updateValidators = [
  check('phone')
    // .matches(/^0\d{1}\-\d{7}$/)
    .matches(/^0[1-9]\d{7,10}$/)
    .withMessage('phone 格式錯誤 ex:02-12345678'),
];
