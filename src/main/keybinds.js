"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keybindsProcess = exports.registerKeybind = exports.KeybindAction = void 0;
var electron_1 = require("electron");
var window_1 = require("./window");
var KeybindAction;
(function (KeybindAction) {
    KeybindAction["PLAY"] = "play";
    KeybindAction["FORWARD"] = "forward";
    KeybindAction["BACKWARD"] = "backward";
    KeybindAction["SPEED_UP"] = "speed_up";
    KeybindAction["SPEED_DOWN"] = "speed_down";
    KeybindAction["VOLUME_UP"] = "volume_up";
    KeybindAction["VOLUME_DOWN"] = "volume_down";
})(KeybindAction = exports.KeybindAction || (exports.KeybindAction = {}));
function registerKeybind(ipcRenderer, keybind, action) {
    ipcRenderer.send("setKeybind", [{ keybind: keybind, action: action }]);
}
exports.registerKeybind = registerKeybind;
exports.keybindsProcess = {
    init: function () {
        electron_1.ipcMain.on('setKeybind', function (event, args) {
            var arg = args[0];
            _registerKeybind(arg.keybind, arg.action);
        });
        electron_1.app.whenReady().then(function () {
            // todo check local data
            // _registerKeybind("f1", KeybindAction.PLAY)
        });
    }
};
function _registerKeybind(keybind, action) {
    // todo save keybind locally
    electron_1.globalShortcut.unregister(keybind);
    electron_1.globalShortcut.register(keybind, function () {
        if (window_1.mainWindow != null) {
            window_1.mainWindow.webContents.send(action);
        }
    });
}
