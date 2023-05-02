import { check } from 'express-validator';

export const signupValidators = [
  check('email').notEmpty().withMessage('email不可為空'),
  check('password').notEmpty().withMessage('password不可為空'),
  check('passwordCheck').notEmpty().withMessage('passwordCheck不可為空'),
  check('email').isEmail().withMessage('必須為email格式'),
  check('password').isLength({ min: 8 }).withMessage('密碼最少為8字'),
];
export const loginValidators = [
  check('email').notEmpty().withMessage('email不可為空'),
  check('password').notEmpty().withMessage('password不可為空')
];
export const updatePasswordValidators = [
  check('password').notEmpty().withMessage('password不可為空'),
  check('passwordCheck').notEmpty().withMessage('passwordCheck不可為空')
];
export const updateProfileValidators = [];