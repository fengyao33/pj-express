import { check } from 'express-validator';

export const loginValidators = [
    check('email').notEmpty().withMessage('email不可為空'),
    check('password').notEmpty().withMessage('password不可為空')
];