import { check } from 'express-validator';

export const storeValidators = [
  check('story')
  .trim()
  .isLength({ min: 5 })
  .withMessage('簡介最少5個字'),
];

export const updateValidators = [
  check('canme').notEmpty().withMessage('中文片名不得為空'),
  check('ename').notEmpty().withMessage('英文片名不得為空'),
  check('rating').isIn(['G', 'PG', 'R']).withMessage('評級錯誤'),
  check('theater').isMongoId().withMessage('影城ID錯誤'),
  check('director').notEmpty().withMessage('導演不得為空'),
  check('actor').isArray().withMessage('演員欄位錯誤'),
  check('Length').notEmpty().withMessage('片長欄位錯誤'),
  check('comeout').notEmpty().withMessage('上映日期欄位錯誤'),
  check('premiere').notEmpty().withMessage('首購時間欄位錯誤'),
  check('trailer').notEmpty().withMessage('預告連結不得為空'),
  check('story').notEmpty().withMessage('簡介欄位不得為空'),
];