// preload.js

// Import necessary modules from Electron
const { contextBridge, ipcRenderer } = require("electron");

// Expose necessary Electron APIs safely to the renderer process
contextBridge.exposeInMainWorld("electron", {
  // Expose ipcRenderer object with limited functions
  ipcRenderer: {
    // Expose 'on' method of ipcRenderer to listen for events
    on: (channel, func) => {
      // Listen for specified 'channel' and invoke 'func' callback with event and arguments
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    },
  },
});
