"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processes = void 0;
var window_1 = require("./window");
var io_1 = require("./io");
var keybinds_1 = require("./keybinds");
exports.processes = [window_1.windowProcess, io_1.ioProcess, keybinds_1.keybindsProcess];
