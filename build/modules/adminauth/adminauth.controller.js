"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.logout = exports.login = exports.singup = void 0;
const success_handler_1 = __importDefault(require("../../middlewares/success_handler"));
const services_1 = require("./services");
/**
 * User Sign Up
 * @param req
 * @param res
 * @param next
 */
function singup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const finder = new services_1.AdminauthService();
        const result = 'QQQ';
        (0, success_handler_1.default)(res, result);
    });
}
exports.singup = singup;
/**
 * User Login
 * @param req
 * @param res
 * @param next
 */
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const finder = new services_1.AdminauthService();
    });
}
exports.login = login;
/**
 * Logout
 * @param req
 * @param res
 * @param next
 */
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const destroyer = new services_1.AdminauthService();
    });
}
exports.logout = logout;
/**
 * Update Password
 * @param req
 * @param res
 * @param next
 */
function updatePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const saver = new services_1.AdminauthService();
    });
}
exports.updatePassword = updatePassword;
