"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    '@src': __dirname,
    '@database': __dirname + '/database',
    '@entities': __dirname + '/entities',
    '@models': __dirname + '/models',
    '@middlewares': __dirname + '/middlewares',
    '@helpers': __dirname + '/helpers',
    '@config': __dirname + '/config',
    '@modules': __dirname + '/modules',
});
