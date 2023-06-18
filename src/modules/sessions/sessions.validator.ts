import { check, body } from 'express-validator';

export const storeValidators = [];

export const updateValidators = [];

const fields = ['endDate', 'roomId', 'startDate', 'cinemaId'];


const notEmptyMessage = (field) => `${field}不可為空`;

export const sessionsList = fields.map((field) => check(field).notEmpty().withMessage(notEmptyMessage(field)));

export const addSessions = [
  check("sessionData").notEmpty()
]



