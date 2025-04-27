import { useEffect, useRef, useState } from "react";
import {
  inputHandler,
  keyDownHandler,
  mouseUpHandler,
  replaceHandler,
  renderBlockHandler,
} from "../../utils/editorHandlers";
import "./Editor.css";
import Dropdown from "../Dropdown";

const initialBlocks = [{ id: 0, type: "paragraph", content: "" }];

const Editor = () => {
  const [dropdownPos, setDropdownPos] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [highlightedText, setHighlightedText] = useState(null);
  const [blocks, setBlocks] = useState(initialBlocks);

  const blocksRefs = useRef({});
  const editorRef = useRef(null);

  useEffect(() => {
    console.log("blocks", blocks);
  }, [blocks]);

  return (
    <>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          keyDownHandler(e, blocks, setBlocks);
        }}
        // onInput={(e) => inputHandler(e, blocks, setBlocks)}
        onMouseUp={(e) =>
          mouseUpHandler(setSelectedRange, setHighlightedText, setDropdownPos)
        }
      >
        {blocks.map((block) => (
          <div
            key={block.id}
            data-id={block.id}
            ref={(el) => {
              blocksRefs.current[block.id] = el;
            }}
            tabIndex={0}
          >
            {renderBlockHandler(block)}
          </div>
        ))}
      </div>

      {dropdownPos && (
        <Dropdown
          handlers={{
            replaceHandler: replaceHandler,
            selectedRange: selectedRange,
            highlightedText: highlightedText,
            dropdownPos: dropdownPos,
            setDropdownPos: setDropdownPos,
          }}
        />
      )}
    </>
  );
};

export default Editor;
