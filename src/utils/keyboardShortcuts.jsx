import commandHandler from "./commandHandler";

const keyboardShortcuts = (e, blocks, setBlocks) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "*") {
    e.preventDefault();
    commandHandler("insertUnorderedList");
  } else if (e.key === "Enter") {
    const lastword = e.target.innerText.split(" ").pop().trim();

    if (lastword.startsWith("/")) {
      e.preventDefault();
      const commandMap = {
        heading: "H1",
        paragraph: "P",
      };

      const command = lastword.replace(/<[^>]+>/g, "").slice(1);

      if (commandMap[command]) {
        e.preventDefault();
        commandHandler("formatBlock", commandMap[command]);
        return;
      }
    }
  } else if (e.ctrlKey && e.key === "z") {
    // e.preventDefault();
    // Undo logic
    console.log("undo");
  } else if (e.ctrlKey && e.shiftKey && e.key === "Z") {
    // e.preventDefault();
    // Redo logic
  }
};

export default keyboardShortcuts;
