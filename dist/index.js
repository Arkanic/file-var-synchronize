"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fvsync_1 = require("./fvsync");
function fvsync(file, encoding) {
    return new fvsync_1.default(file, encoding);
}
exports.default = fvsync;
module.exports = fvsync;
