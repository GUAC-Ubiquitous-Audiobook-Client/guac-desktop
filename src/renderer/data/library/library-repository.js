"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryRepositoryImpl = void 0;
var uuid_1 = require("uuid");
var electron_json_storage_1 = __importDefault(require("electron-json-storage"));
var fs = require("fs");
var mm = require("musicmetadata");
var LibraryRepositoryImpl = /** @class */ (function () {
    function LibraryRepositoryImpl() {
        this.STORAGE_KEY_DATA = "data_books";
        this.STORAGE_KEY_SELECTED_LIBRARY_ITEM = "selected_library_item";
        this.libraryItems = {
            data: [],
            selectedItemId: null,
            getSelectedItem: function () {
                var _this = this;
                return this.data.filter(function (item) { return item.id === _this.selectedItemId; })[0];
            },
            getSelectedFileForItem: function () {
                var _a;
                var item = this.getSelectedItem();
                return (_a = item === null || item === void 0 ? void 0 : item.files.filter(function (file) { return file.id === item.selectedFileId; })[0]) !== null && _a !== void 0 ? _a : null;
            }
        };
        var instanceThis = this;
        electron_json_storage_1.default.has(this.STORAGE_KEY_DATA, function (error, hasKey) {
            if (hasKey) {
                electron_json_storage_1.default.get(instanceThis.STORAGE_KEY_DATA, function (error, _data) {
                    instanceThis.libraryItems.data = _data.data;
                    electron_json_storage_1.default.has(instanceThis.STORAGE_KEY_SELECTED_LIBRARY_ITEM, function (error, hasKey) {
                        if (hasKey) {
                            electron_json_storage_1.default.get(instanceThis.STORAGE_KEY_SELECTED_LIBRARY_ITEM, function (error, _data) {
                                instanceThis.setSelectedLibraryItem(_data);
                            });
                        }
                    });
                });
            }
        });
    }
    LibraryRepositoryImpl.prototype.setSelectedLibraryItem = function (itemId) {
        this.libraryItems.selectedItemId = itemId;
    };
    LibraryRepositoryImpl.prototype.setSelectedFileForLibraryItem = function (itemId) {
        if (this.libraryItems.getSelectedItem() != null) {
            this.libraryItems.getSelectedItem().selectedFileId = itemId;
        }
    };
    LibraryRepositoryImpl.prototype._filesWithTags = function (filePaths) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceThis, mappedFiles, _i, filePaths_1, val, tags, duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instanceThis = this;
                        mappedFiles = [];
                        _i = 0, filePaths_1 = filePaths;
                        _a.label = 1;
                    case 1:
                        if (!(_i < filePaths_1.length)) return [3 /*break*/, 5];
                        val = filePaths_1[_i];
                        return [4 /*yield*/, instanceThis._extractFileId3Tags(val)];
                    case 2:
                        tags = _a.sent();
                        return [4 /*yield*/, instanceThis._extractFileDuration(val)];
                    case 3:
                        duration = _a.sent();
                        mappedFiles.push({
                            id: uuid_1.v4(),
                            path: val,
                            clipLength: duration,
                            clipLengthPlayed: 0,
                            tags: {
                                fileTitle: tags.title,
                                author: tags.artist[0],
                                bookName: tags.album,
                            },
                            dateAddedTimestamp: new Date().getTime()
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, mappedFiles];
                }
            });
        });
    };
    LibraryRepositoryImpl.prototype.addLibraryItem = function (filePaths) {
        return __awaiter(this, void 0, void 0, function () {
            function extractBookName(files) {
                var file = files[0];
                return file.tags.bookName !== undefined ? file.tags.bookName :
                    file.tags.fileTitle !== undefined ? file.tags.fileTitle :
                        file.path.substring(file.path.lastIndexOf('/') + 1, file.path.lastIndexOf('.'));
            }
            var filesTagged, newItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._filesWithTags(filePaths)];
                    case 1:
                        filesTagged = _a.sent();
                        newItem = {
                            id: uuid_1.v4(),
                            name: extractBookName(filesTagged),
                            files: filesTagged,
                            selectedFileId: null,
                            dateAddedTimestamp: new Date().getTime()
                        };
                        this.libraryItems.data.push(newItem);
                        this._saveData(this.libraryItems);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryRepositoryImpl.prototype.addFilesToLibraryItem = function (filePaths) {
        return __awaiter(this, void 0, void 0, function () {
            var newItems, libItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._filesWithTags(filePaths)];
                    case 1:
                        newItems = _a.sent();
                        libItem = this.libraryItems.getSelectedItem();
                        newItems.forEach(function (value) {
                            libItem === null || libItem === void 0 ? void 0 : libItem.files.push(value);
                        });
                        this._saveData(this.libraryItems);
                        return [2 /*return*/];
                }
            });
        });
    };
    LibraryRepositoryImpl.prototype.getThumbnailForFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._extractFileId3Tags(filePath)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.picture[0].data];
                }
            });
        });
    };
    LibraryRepositoryImpl.prototype.getFileName = function (file) {
        return file.path.substring(file.path.lastIndexOf('/') + 1);
    };
    LibraryRepositoryImpl.prototype.selectLibraryItem = function (libraryItemId) {
        this.setSelectedLibraryItem(libraryItemId);
        electron_json_storage_1.default.set(this.STORAGE_KEY_SELECTED_LIBRARY_ITEM, libraryItemId, function (error) {
            if (error) {
                throw error;
            }
        });
    };
    LibraryRepositoryImpl.prototype.selectFileForCurrentLibraryItem = function (itemId) {
        this.setSelectedFileForLibraryItem(itemId);
        this._saveData(this.libraryItems);
    };
    LibraryRepositoryImpl.prototype.setFileLengthPlayedForCurrentLibraryItem = function (length) {
        var file = this.libraryItems.getSelectedFileForItem();
        if (file != null && file.clipLengthPlayed < length) {
            file.clipLengthPlayed = length;
            this._saveData(this.libraryItems);
        }
    };
    LibraryRepositoryImpl.prototype.deleteLibraryItem = function (itemId) {
        var index = this.libraryItems.data.findIndex(function (item) { return item.id === itemId; });
        if (index !== -1) {
            this.libraryItems.data.splice(index, 1);
        }
        this._saveData(this.libraryItems);
    };
    LibraryRepositoryImpl.prototype.deleteCurrentSelectedLibraryItem = function () {
        var _a;
        this.deleteLibraryItem((_a = this.libraryItems.getSelectedItem()) === null || _a === void 0 ? void 0 : _a.id);
    };
    LibraryRepositoryImpl.prototype._saveData = function (newData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                electron_json_storage_1.default.set(this.STORAGE_KEY_DATA, newData, function (error) {
                    if (error) {
                        throw error;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    LibraryRepositoryImpl.prototype._extractFileId3Tags = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var readableStream = fs.createReadStream(filePath);
                        mm(readableStream, function (err, metadata) {
                            if (err) {
                                resolve(err);
                                throw err;
                            }
                            resolve(metadata);
                            readableStream.close();
                        });
                    })];
            });
        });
    };
    LibraryRepositoryImpl.prototype._extractFileDuration = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var player = new Audio();
                        player.src = 'file://' + filePath;
                        player.load();
                        player.oncanplaythrough = function (event) {
                            resolve(player.duration);
                        };
                    })];
            });
        });
    };
    return LibraryRepositoryImpl;
}());
exports.LibraryRepositoryImpl = LibraryRepositoryImpl;
