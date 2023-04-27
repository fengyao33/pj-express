"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const successHandler = (res, result) => {
    res.status(200).json({
        status: 'success',
        data: result,
    });
};
exports.default = successHandler;
