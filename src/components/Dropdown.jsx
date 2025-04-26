const Dropdown = ({
  replaceHandler,
  selectedRange,
  highlightedText,
  dropdownPos,
  setDropdownPos,
}) => {
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
    </div>
  );
};

export default Dropdown;
