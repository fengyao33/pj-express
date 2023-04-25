"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../config/settings");
const DB = `${settings_1.settings.DB.URI}${settings_1.settings.DB.NAME}`;
mongoose_1.default
    .connect(DB, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('MongoDB Connection Success!'))
    .catch(error => console.log(error));
