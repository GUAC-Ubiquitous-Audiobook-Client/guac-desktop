import {Accelerator, app, globalShortcut, ipcMain, IpcRenderer} from 'electron';
import MainProcess from "./main-process";
import {mainWindow} from "./window";

export enum KeybindAction {
    PLAY = "play",
    FORWARD = "forward",
    BACKWARD = "backward",
    SPEED_UP = "speed_up",
    SPEED_DOWN = "speed_down",
    VOLUME_UP = "volume_up",
    VOLUME_DOWN = "volume_down"
}

export function registerKeybind(ipcRenderer: IpcRenderer, keybind: Accelerator, action: KeybindAction) {
    ipcRenderer.send("setKeybind", [{keybind: keybind, action: action}])
}

export const keybindsProcess: MainProcess = {

    init() {
        ipcMain.on('setKeybind', (event, args) => {
            let arg = args[0]
            _registerKeybind(arg.keybind, arg.action)
        });
        app.whenReady().then(() => {
            // todo check local data
            // _registerKeybind("f1", KeybindAction.PLAY)
        })
    }
}

function _registerKeybind(keybind: Accelerator, action: KeybindAction) {
    //todo save keybind locally
    globalShortcut.unregister(keybind)
    globalShortcut.register(keybind, () => {
        if (mainWindow != null) {
            mainWindow.webContents.send(action)
        }
    })
}
