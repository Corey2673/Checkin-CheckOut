import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown"; // Import AceEditor mode for Markdown
import "ace-builds/src-noconflict/theme-dracula"; // Import AceEditor Dracula theme

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFile: "",
    };

    window.electron.ipcRenderer.on("new-file", (e, fileContent) => {
      this.setState({
        loadedFile: fileContent,
      });
    });
  }

  loadedFile = (index) => {};

  render() {
    return (
      <div className="App h-screen bg-gray-800 text-white">
        <div className="flex h-full">
          {/* Left panel for AceEditor */}
          <div className="flex-1 bg-gray-900">
            <AceEditor
              mode="markdown"
              theme="dracula"
              onChange={(newContent) => {
                this.setState({
                  loadedFile: newContent,
                });
              }}
              name="markdown_editor"
              value={this.state.loadedFile}
              className="h-full w-full"
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          {/* Right panel for Markdown preview */}
          <div className="w-1/3 bg-gray-900 p-4 border-l border-gray-800 overflow-y-auto">
            <Markdown>{this.state.loadedFile}</Markdown>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
