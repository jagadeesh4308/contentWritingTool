import commandHandler from "../../utils/commandHandler";
import { insertBlocksHandler } from "../../utils/editorHandlers";
import "./Toolbar.css";

const Toolbar = ({ content }) => {
  return (
    <div className="toolbar">
      {/* heading  */}
      <select
        onChange={(e) => commandHandler("formatBlock", e.target.value)}
        defaultValue={"P"}
      >
        <option value="P">Normal Text</option>
        <option value="H1">Heading 1</option>
        <option value="H2">Heading 2</option>
        <option value="H3">Heading 3</option>
        <option value="H4">Heading 4</option>
        <option value="H5">Heading 5</option>
      </select>

      {/* font */}
      <select onChange={(e) => commandHandler("fontName", e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times</option>
      </select>

      {/* font size */}
      <select onChange={(e) => commandHandler("fontSize", e.target.value)}>
        <option value="1">8</option>
        <option value="2">11</option>
        <option value="3">13</option>
        <option value="4">15</option>
        <option value="5">18</option>
        <option value="6">24</option>
        <option value="7">36</option>
      </select>

      {/* text formatting  */}
      <button onClick={() => commandHandler("bold")} className="remove-border">
        <b>B</b>
      </button>
      <button
        onClick={() => commandHandler("italic")}
        className="remove-border"
      >
        <i>I</i>
      </button>
      <button
        onClick={() => commandHandler("underline")}
        className="remove-border"
      >
        <u>U</u>
      </button>

      {/* lists */}
      <select onChange={(e) => commandHandler(e.target.value)}>
        <option value="insertUnorderedList">• List</option>
        <option value="insertOrderedList">1. List</option>
      </select>

      {/* indents */}
      <button
        onClick={() => commandHandler("indent")}
        className="remove-border"
      >
        <b>Indent</b>
      </button>
      <button
        onClick={() => commandHandler("outdent")}
        className="remove-border"
      >
        <b>Outdent</b>
      </button>

      {/* Custom blocks */}
      <button
        onClick={() => insertBlocksHandler("blockquote", content)}
        className="remove-border"
      >
        Quote
      </button>
      <button
        onClick={() => insertBlocksHandler("pre", content)}
        className="remove-border"
      >
        Code Block
      </button>
      <button
        onClick={() => insertBlocksHandler("div", content)}
        className="remove-border"
      >
        Callout
      </button>
    </div>
  );
};

export default Toolbar;
