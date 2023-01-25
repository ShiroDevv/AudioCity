//* Making a rpcRenderer context bridge.
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
    send: ipcRenderer.send,
    receive: (channel: string, func: (event: Event, ...args: Array<any>) => void) => {
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
    }
});