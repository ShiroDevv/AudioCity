//* Importing app and browser window for Electron setup.
import { app, BrowserWindow, ipcMain } from "electron";
import differentiator from "../AudioPlayer/differentiator";
import { player } from "..";

// Class to run the window.
export default class AudioCity {
    //* Defining variables used by the app.
    app: typeof app = app;
    window?: BrowserWindow;
    directory: string;

    //* Making the constructor for the app.
    constructor() {
        //* Creating the directory object and creating the window when done.
        this.directory = process.cwd().replaceAll("\\", "/");
        let preload = `${this.directory}/dist/Electron/preload.js`;
        app.whenReady().then(() => {
            //* Giving the preload preference
            this.window = new BrowserWindow({
                webPreferences: {
                    preload
                },
                title: "AudioCity"
            });

            //! Website player coming soon!
            // this.window.loadURL("https://shirodev.dev/experimental/AudioCity")
            //* Loading file for right now.
            this.window.loadFile(`${this.directory}/pages/html/index.html`);
        });

        this.handleEvents();
    }

    //* Checking if the window is defined for the function.
    public windowDefined() {
        return window ? true : false;
    }

    //* Handling ipcRenderer <--> ipcMain events.
    private handleEvents() {
        ipcMain.on("ready", async () => {
            console.log("ready!");
            this.window?.webContents.on('did-finish-load', () => {
                this.window?.webContents.send("ready");
            })
        });

        ipcMain.on("url", (ev, URL) => {
            if (!URL) return;

            differentiator(URL);
        });
    }
}