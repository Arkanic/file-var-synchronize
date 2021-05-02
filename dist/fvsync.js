"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var FVSync = /** @class */ (function () {
    function FVSync(file, encoding) {
        this.file = path.resolve(file);
        this.encoding = encoding || "utf-8";
        this._content = "";
        this._connected = false;
        this._operationsRunning = 0; // internal, the amount of file i/o operations currently running
        this.onWorkingChange = function () { };
    }
    FVSync.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            fs.readFile(_this.file, _this.encoding, function (err, data) {
                if (err)
                    return resolve(err);
                _this._content = data; // skip getters/setters to prevent default action
                _this._connected = true;
                resolve(undefined);
            });
        });
    };
    FVSync.prototype.disconnect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._connected = false;
            _this.onWorkingChange = function () {
                if (_this.operationsRunning == 0) {
                    _this.onWorkingChange = function () { };
                    resolve();
                }
            };
        });
    };
    FVSync.prototype.write = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.operationsRunning++;
            fs.writeFile(_this.file, _this.content, _this.encoding, function (err) {
                _this.operationsRunning--;
                if (err)
                    resolve(err);
                else
                    resolve(undefined);
            });
        });
    };
    Object.defineProperty(FVSync.prototype, "connected", {
        get: function () {
            return this._connected;
        },
        set: function (value) {
            return;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FVSync.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
            if (this.connected)
                this.write();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FVSync.prototype, "operationsRunning", {
        get: function () {
            return this._operationsRunning;
        },
        set: function (value) {
            this._operationsRunning = value;
            this.onWorkingChange();
        },
        enumerable: false,
        configurable: true
    });
    return FVSync;
}());
exports.default = FVSync;
