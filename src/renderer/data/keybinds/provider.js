"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybindsRepositoryProvider = void 0;
var keybinds_repository_1 = require("./keybinds-repository");
var KeybindsRepositoryProvider = /** @class */ (function () {
    function KeybindsRepositoryProvider() {
        this._keybindsRepository = new keybinds_repository_1.KeybindsRepositoryImpl();
    }
    Object.defineProperty(KeybindsRepositoryProvider, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeybindsRepositoryProvider, "keybindsRepository", {
        get: function () {
            return this.instance._keybindsRepository;
        },
        enumerable: false,
        configurable: true
    });
    return KeybindsRepositoryProvider;
}());
exports.KeybindsRepositoryProvider = KeybindsRepositoryProvider;
