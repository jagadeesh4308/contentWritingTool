import commandHandler from "./commandHandler";
import keyboardShortcuts from "./keyboardShortcuts";

const keyDownHandler = (e, blocks, setBlocks) => {
  if (e.key === "Tab") {
    e.preventDefault();
    if (e.shiftKey) {
      commandHandler("outdent");
    } else {
      commandHandler("indent");
    }
  } else {
    keyboardShortcuts(e, blocks, setBlocks);
  }
};

const renderBlockHandler = (block) => {
  switch (block.type) {
    case "title":
      return <h1>{block.content}</h1>;
    case "paragraph":
      return <p>{block.content}</p>;
    case "quote":
      return <blockquote>{block.content}</blockquote>;
    case "code":
      return <pre>{block.content}</pre>;
    default:
      return <p>{block.content}</p>;
  }
};

const inputHandler = (e, blocks, setBlocks) => {
  const blockId = Number(e.target.getAttribute("data-id"));
  const newContent = e.target.innerText;

  // if (e.type === "Enter") {
  //   e.preventDefault();
  //   const updatedBlocks = [];
  //   setBlocks((prevBlocks) => {
  //     for (let block of prevBlocks) {
  //       updatedBlocks.push(block);
  //       if (block.id === blockId) {
  //         updatedBlocks[updatedBlocks.length - 1] = {
  //           ...block,
  //           content: block.content,
  //         };

  //         updatedBlocks.push({
  //           id: Date.now(),
  //           type: "paragraph",
  //           content: "",
  //         });
  //       }
  //     }
  //     return updatedBlocks;
  //   });

  //   console.log(updatedBlocks);

  //   return;
  // }

  const newBlock = blocks.map((block) => {
    console.log(block.id, blockId);
    return block.id === blockId ? { ...block, content: newContent } : block;
  });

  console.log("newBlock", newBlock);
  setBlocks(newBlock);
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

const insertBlocksHandler = (type) => {
  const selection = window.getSelection();
  const text = selection.toString();
  let html = "";
  switch (type) {
    case "blockquote":
      html = `<q>${text}</q>`;
      break;
    case "pre":
      html = `<pre class="code-block"><code>${text}</code></pre>`;
      break;
    case "div":
      html = `<div class="callout">${text}</div>`;
      break;
    default:
      return;
  }
  commandHandler("insertHTML", html);
};

const conversion = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const allowedTags = [
    "b",
    "i",
    "u",
    "strong",
    "em",
    "p",
    "h1",
    "h2",
    "h3",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
  ];

  const cleanNode = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        const fragment = document.createDocumentFragment();
        while (node.firstChild) {
          fragment.appendChild(node.firstChild);
        }
        node.parentNode.replaceChild(fragment, node);
      } else {
        node.removeAttribute("style");
        node.removeAttribute("class");
      }
    }
    node.childNodes.forEach(cleanNode);
  };

  doc.body.childNodes.forEach(cleanNode);
  return doc.body.innerHTML;
};

const pasteHandler = (e, id, blocks, setBlocks) => {
  e.preventDefault();
  const clipboardData = e.clipboardData || window.clipboardData;
  const htmlData = clipboardData.getData("text/html");
  const textData = clipboardData.getData("text/plain");

  let contentToInsert = textData;

  if (htmlData) {
    contentToInsert = conversion(htmlData);
  }

  const newBlocks = blocks.map((block) => {
    if (block.id === id) {
      return { ...block, content: block.content + contentToInsert };
    }
    return block;
  });

  setBlocks(newBlocks);
};

export {
  keyDownHandler,
  mouseUpHandler,
  replaceHandler,
  insertBlocksHandler,
  inputHandler,
  pasteHandler,
  renderBlockHandler,
};
