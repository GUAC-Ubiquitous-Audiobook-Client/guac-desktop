import {app, dialog, ipcMain, IpcRenderer, protocol} from 'electron';
import MainProcess from "./main-process";

export function importFiles(ipcRenderer: IpcRenderer, fileType: string, extensions: string[]): string[] {
    return ipcRenderer.sendSync('importFiles', [{
        name: fileType,
        extensions
    }])
}

export const ioProcess: MainProcess = {

    init() {
        ipcMain.on('importFiles', (event, args) => {
            const files = dialog.showOpenDialogSync({
                properties: ["multiSelections", "openFile"] as Array<any>,
                filters: args
            })
            event.returnValue = files;
        });

        app.whenReady().then(() => {
            protocol.registerFileProtocol('file', (request, callback) => {
                const pathname = decodeURI(request.url.replace('file:///', ''));
                callback(pathname);
            });
        });
    }
}
