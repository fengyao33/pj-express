"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//importing all routes here
router.get('/', (req, res) => {
    return res.json({ hello: 'Wordl' });
});
exports.default = router;
