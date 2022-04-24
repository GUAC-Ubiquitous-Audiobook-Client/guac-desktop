"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioProcess = exports.importFiles = void 0;
var electron_1 = require("electron");
function importFiles(ipcRenderer, fileType, extensions) {
    return ipcRenderer.sendSync('importFiles', [{
            name: fileType,
            extensions: extensions
        }]);
}
exports.importFiles = importFiles;
exports.ioProcess = {
    init: function () {
        electron_1.ipcMain.on('importFiles', function (event, args) {
            var files = electron_1.dialog.showOpenDialogSync({
                properties: ["multiSelections", "openFile"],
                filters: args
            });
            event.returnValue = files;
        });
        electron_1.app.whenReady().then(function () {
            electron_1.protocol.registerFileProtocol('file', function (request, callback) {
                var pathname = decodeURI(request.url.replace('file:///', ''));
                callback(pathname);
            });
        });
    }
};
