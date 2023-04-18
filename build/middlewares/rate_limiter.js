"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    keyPrefix: 'middleware',
    points: 5,
    duration: 1, // per 1 second by IP
});
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => {
        next();
    })
        .catch(() => {
        res.status(429).send('Too Many Requests');
    });
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
