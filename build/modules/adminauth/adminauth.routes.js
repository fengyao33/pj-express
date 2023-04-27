"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@middlewares/validator");
const express_1 = require("express");
const Controller = __importStar(require("./adminauth.controller"));
const adminauth_validator_1 = require("./adminauth.validator");
const router = (0, express_1.Router)();
router.post('/singup', [...adminauth_validator_1.storeValidators, validator_1.validateBody], Controller.singup);
router.post('/login', [...adminauth_validator_1.storeValidators, validator_1.validateBody], Controller.login);
router.put('/logout/:id', [...adminauth_validator_1.updateValidators, validator_1.validateBody], Controller.logout);
router.post('/password', Controller.updatePassword);
exports.default = router;
