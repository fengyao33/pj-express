"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminauth_routes_1 = __importDefault(require("./modules/adminauth/adminauth.routes"));
const userauth_routes_1 = __importDefault(require("./modules/userauth/userauth.routes"));
const router = (0, express_1.Router)();
//importing all routes here
router.get('/', (req, res) => {
    return res.json({ Server: 'on' });
});
router.use('/user', userauth_routes_1.default);
router.use('/admin/user', adminauth_routes_1.default);
exports.default = router;
