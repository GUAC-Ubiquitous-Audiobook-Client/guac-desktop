"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowProcess = exports.mainWindow = void 0;
var electron_1 = require("electron");
exports.windowProcess = {
    init: function () {
        // Handle creating/removing shortcuts on Windows when installing/uninstalling.
        if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
            electron_1.app.quit();
        }
        var createWindow = function () {
            var isDevelopment = process.env.NODE_ENV !== 'production';
            function debugWindow() {
                var display = electron_1.screen.getAllDisplays()[1];
                var w = display.bounds.width / 2;
                var h = display.bounds.height;
                var x = display.bounds.x + w;
                var y = display.bounds.y;
                return new electron_1.BrowserWindow({
                    webPreferences: {
                        nodeIntegration: true,
                        webSecurity: false,
                        enableRemoteModule: true
                    },
                    x: x,
                    y: y,
                    height: h,
                    width: w,
                });
            }
            function releaseWindow() {
                return new electron_1.BrowserWindow({
                    width: 1200,
                    height: 800,
                });
            }
            exports.mainWindow = isDevelopment ? debugWindow() : releaseWindow();
            if (isDevelopment) {
                exports.mainWindow.webContents.openDevTools();
            }
            exports.mainWindow.setBackgroundColor("#333333");
            exports.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
            exports.mainWindow.on('closed', function () {
                exports.mainWindow = null;
            });
            // Emitted when the window is closed.
            exports.mainWindow.on('closed', function () {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                exports.mainWindow = null;
            });
            exports.mainWindow.webContents.on('before-input-event', function (event, input) {
                if (input.control && input.key.toLowerCase() === 'i') {
                    event.preventDefault();
                }
            });
        };
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        electron_1.app.on('ready', createWindow);
        // Quit when all windows are closed.
        electron_1.app.on('window-all-closed', function () {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
        electron_1.app.on('activate', function () {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (exports.mainWindow === null) {
                createWindow();
            }
        });
    }
};
