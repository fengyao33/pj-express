"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
require("./alias");
const logger_1 = __importDefault(require("./helpers/logger"));
const error_handler_1 = require("./middlewares/error_handler");
const rate_limiter_1 = require("./middlewares/rate_limiter");
//importing routes
const router_1 = __importDefault(require("./router"));
//importing configs
const settings_1 = require("./config/settings");
require("./connection/mongoDB");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.middlewares();
        this.routes();
    }
    config() { }
    middlewares() {
        this.app.use((0, morgan_1.default)('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]'));
        this.app.use((0, cors_1.default)());
        this.app.use(rate_limiter_1.rateLimiterMiddleware);
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(router_1.default);
        this.app.use(error_handler_1.handleErrorMiddleware);
    }
    start() {
        this.app.listen(settings_1.settings.PORT, () => {
            logger_1.default.info('🚀 Server listen on port ' + settings_1.settings.PORT);
        });
    }
}
const server = new Server();
server.start();
