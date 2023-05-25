import { check } from 'express-validator';

export const createActivityValidators = [
    check('title').notEmpty().withMessage('title不可為空'),
    check('content').notEmpty().withMessage('content不可為空'),
    check('img').notEmpty().withMessage('img不可為空'),
    check('startDatetime').notEmpty().withMessage('startDatetime不可為空'),
    check('endDatetime').notEmpty().withMessage('endDatetime不可為空'),
];
