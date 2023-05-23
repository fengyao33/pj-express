import { check } from 'express-validator';

export const storeValidators = [
  check('phone')
    .matches(/^\(\d{2}\)\d{7}$/)
    .withMessage('phone 格式錯誤 ex:(02)1234567'),
];

export const updateValidators = [
  check('phone')
    .matches(/^\(\d{2}\)\d{7}$/)
    .withMessage('phone 格式錯誤 ex:(02)1234567'),
];
