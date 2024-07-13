// main.js

// Import necessary modules from Electron
const { app, BrowserWindow, dialog, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

// Declare a variable to hold the reference to the main window
let mainWindow;

// Function to create the main browser window
function createWindow() {
  // Create a new browser window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // Use a preload script to safely expose ipcRenderer to the renderer process
      preload: path.join(__dirname, "preload.js"),
      // Enable context isolation for security
      contextIsolation: true,
      // Disable the remote module to improve security
      enableRemoteModule: false,
    },
  });

  // Load the React application's main URL
  mainWindow.loadURL("http://localhost:3000");

  // Define the application menu template
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          accelerator: "CmdOrCtrl+O",
          click() {
            openFile();
          },
        },
        {
          label: "Open Folder",

          accelerator: "CmdOrCtrl+O",
          click() {
            openDir();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click() {
            // Open an external link to Electron's official website
            require("electron").shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle Developer Tools",
          // Set accelerator for toggling developer tools based on platform
          accelerator:
            process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          // Function to toggle developer tools for the main window
          click() {
            mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    },
  ];

  // Adjust the template for macOS specific features
  if (process.platform === "darwin") {
    // Add application name and standard macOS menu items
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });

    // Add additional items to the "Edit" submenu for macOS
    template[2].submenu.push(
      { type: "separator" },
      {
        label: "Speech",
        submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
      }
    );

    // Modify the "Window" menu for macOS
    template[4].submenu = [
      { role: "close" },
      { role: "minimize" },
      { role: "zoom" },
      { type: "separator" },
      { role: "front" },
    ];
  }

  // Create a menu from the template and set it as the application menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Event handler when the main window is closed
  mainWindow.on("closed", function () {
    // Dereference the window object to free up memory
    mainWindow = null;
  });
}

// Event listener when Electron has finished initializing
app.on("ready", createWindow);

// Event listener when all windows are closed
app.on("window-all-closed", function () {
  // Quit the app on all platforms except macOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Event listener when the app is activated (e.g., clicking on the dock icon on macOS)
app.on("activate", function () {
  // Recreate the main window if it no longer exists (e.g., after closing on macOS)
  if (mainWindow === null) {
    createWindow();
  }
});

// Function to open a file dialog and read file contents
async function openFile() {
  try {
    // Show an open file dialog and await user selection
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [{ name: "Markdown", extensions: ["md", "markdown", "txt"] }],
    });

    // If dialog was canceled or no files were selected, return early
    if (canceled || filePaths.length === 0) return;

    // Read the contents of the selected file as UTF-8 encoded text
    const file = filePaths[0];
    const fileContent = fs.readFileSync(file, "utf8");

    // Send the file content to the renderer process via IPC
    mainWindow.webContents.send("new-file", fileContent);
  } catch (err) {
    // Handle any errors that occur during file opening or reading
    console.error("Failed to open file:", err);
  }
}

function openDir() {
  const directory = dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });

  if (!directory || directory.length === 0) {
    console.log("No directory selected or dialog cancelled");
    return;
  }

  const dir = directory[0];
  if (typeof dir !== "string") {
    console.error("Invalid directory path:", dir);
    return;
  }

  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const filteredFiles = files.filter((file) => file.includes(".md"));
    const filePaths = filteredFiles.map((file) => path.join(dir, file));
    console.log(filePaths);
    console.log(filteredFiles);
    mainWindow.webContents.send("new-dir", filePaths, dir);
  });
}
