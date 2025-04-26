import { useRef, useState } from "react";
import {
  keyDownHandler,
  inputHandler,
  mouseUpHandler,
  replaceHandler,
} from "../../utils/editorHandlers";
import "./Editor.css";
import Dropdown from "../Dropdown";

const Editor = ({ setContent }) => {
  const editorRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [highlightedText, setHighlightedText] = useState("");

  return (
    <>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onKeyDown={(e) => {
          keyDownHandler(e);
        }}
        onInput={() => {
          inputHandler(setContent, editorRef);
        }}
        onMouseUp={() =>
          mouseUpHandler(setSelectedRange, setHighlightedText, setDropdownPos)
        }
        suppressContentEditableWarning
      ></div>

      {dropdownPos && (
        <Dropdown
          replaceHandler={replaceHandler}
          selectedRange={selectedRange}
          highlightedText={highlightedText}
          dropdownPos={dropdownPos}
          setDropdownPos={setDropdownPos}
        />
      )}
    </>
  );
};

export default Editor;
