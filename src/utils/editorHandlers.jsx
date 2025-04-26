import commandHandler from "./commandHandler";
import keyboardShortcuts from "./keyboardShortcuts";

const keyDownHandler = (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    if (e.shiftKey) {
      commandHandler("outdent");
    } else {
      commandHandler("indent");
    }
  } else {
    keyboardShortcuts(e);
  }
};

const inputHandler = (setContent, editorRef) => {
  setContent(editorRef.current.innerText);
};

const mouseUpHandler = (
  setSelectedRange,
  setHighlightedText,
  setDropdownPos
) => {
  const selection = window.getSelection();
  const text = selection.toString();

  if (text.length > 0 && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    setSelectedRange(range.cloneRange());
    setHighlightedText(text);

    const rect = range.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  } else {
    setDropdownPos(null);
  }
};

const replaceHandler = (
  type,
  selectedRange,
  highlightedText,
  setDropdownPos
) => {
  if (!selectedRange) return;

  let html = "";
  switch (type) {
    case "uppercase":
      html = highlightedText.toUpperCase();
      break;
    case "highlight":
      html = `<span class="highlighted">${highlightedText}</span>`;
      break;
    case "emoji":
      html = `💡 ${highlightedText}`;
      break;
    default:
      html = highlightedText;
  }

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(selectedRange);
  commandHandler("insertHTML", html);
  setDropdownPos(null);
};

const insertBlocksHandler = (type, content) => {
  let html = "";
  switch (type) {
    case "blockquote":
      html = `<blockquote>${content}</blockquote>`;
      break;
    case "pre":
      html = `<pre><code>${content}</code></pre>`;
      break;
    case "div":
      html = `<div class="callout">${content}</div>`;
      break;
    default:
      return;
  }
  commandHandler("insertHTML", html);
};

export {
  keyDownHandler,
  inputHandler,
  mouseUpHandler,
  replaceHandler,
  insertBlocksHandler,
};
