import {app, BrowserWindow, screen} from 'electron';
import MainProcess from "./main-process";

export let mainWindow: BrowserWindow | null

export const windowProcess: MainProcess = {

    init() {

        // Handle creating/removing shortcuts on Windows when installing/uninstalling.
        if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
            app.quit();
        }

        const createWindow = () => {

            const isDevelopment = process.env.NODE_ENV !== 'production'

            function debugWindow(): BrowserWindow {
                const display = screen.getAllDisplays()[1]
                const w = display.bounds.width / 2
                const h = display.bounds.height
                const x = display.bounds.x + w
                const y = display.bounds.y
                return new BrowserWindow({
                    webPreferences: {
                        nodeIntegration: true,
                        webSecurity: false,
                        enableRemoteModule: true
                    },
                    x: x,
                    y: y,
                    height: h,
                    width: w,
                })
            }

            function releaseWindow(): BrowserWindow {
                return new BrowserWindow({
                    width: 1200,
                    height: 800,
                })
            }

            mainWindow = isDevelopment ? debugWindow() : releaseWindow()

            if (isDevelopment) {
                mainWindow.webContents.openDevTools();
            }

            mainWindow.setBackgroundColor("#333333")
            mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

            mainWindow.on('closed', () => {
                mainWindow = null
            })

            // Emitted when the window is closed.
            mainWindow.on('closed', () => {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                (mainWindow as any) = null;
            });

            mainWindow.webContents.on('before-input-event', (event, input) => {
                if (input.control && input.key.toLowerCase() === 'i') {
                    console.log('Pressed Control+I')
                    event.preventDefault()
                }
            })
        };

        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', createWindow);

        // Quit when all windows are closed.
        app.on('window-all-closed', () => {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) {
                createWindow();
            }
        });

    }
}
