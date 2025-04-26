import React, { useState } from "react";
import Editor from "./components/Editor/Editor";
import Toolbar from "./components/Toolbar/Toolbar";

const App = () => {
  const [content, setContent] = useState(null);
  return (
    <div className="app">
      <Toolbar content={content} />
      <Editor setContent={setContent} />
    </div>
  );
};

export default App;
