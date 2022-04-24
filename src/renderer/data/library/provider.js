"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryRepositoryProvider = void 0;
var library_repository_1 = require("./library-repository");
var LibraryRepositoryProvider = /** @class */ (function () {
    function LibraryRepositoryProvider() {
        this._libraryRepository = new library_repository_1.LibraryRepositoryImpl();
    }
    Object.defineProperty(LibraryRepositoryProvider, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LibraryRepositoryProvider, "libraryRepository", {
        get: function () {
            return this.instance._libraryRepository;
        },
        enumerable: false,
        configurable: true
    });
    return LibraryRepositoryProvider;
}());
exports.LibraryRepositoryProvider = LibraryRepositoryProvider;
