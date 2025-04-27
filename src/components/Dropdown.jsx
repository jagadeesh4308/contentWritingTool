const Dropdown = ({ handlers }) => {
  const replaceHandler = handlers.replaceHandler,
    selectedRange = handlers.selectedRange,
    highlightedText = handlers.highlightedText,
    setDropdownPos = handlers.setDropdownPos,
    dropdownPos = handlers.dropdownPos;
  return (
    <div
      className="dropdown"
      style={{ top: dropdownPos.top, left: dropdownPos.left }}
    >
      <button
        onClick={() =>
          replaceHandler(
            "uppercase",
            selectedRange,
            highlightedText,
            setDropdownPos
          )
        }
      >
        UPPERCASE
      </button>
      <button
        onClick={() =>
          replaceHandler(
            "highlight",
            selectedRange,
            highlightedText,
            setDropdownPos
          )
        }
        className="highlighted"
      >
        Highlight
      </button>
      <button
        onClick={() =>
          replaceHandler(
            "emoji",
            selectedRange,
            highlightedText,
            setDropdownPos
          )
        }
      >
        💡 Emoji
      </button>
      <button
        onClick={() => {
          setDropdownPos(null);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Dropdown;
