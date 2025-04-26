import commandHandler from "./commandHandler";

const keyboardShortcuts = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "*") {
    e.preventDefault();
    commandHandler("insertUnorderedList");
  } else if (e.key === "Enter") {
    const lastword = e.target.innerHTML.split(" ").pop();
    if (lastword.startsWith("/")) {
      const str = lastword.replace(/<[^>]+>/g, "").slice(1);
      console.log(str);
      if (str == "heading") {
        e.preventDefault();
        commandHandler("formatBlock", "H1");
      } else if (str == "paragraph") {
        e.preventDefault();
        commandHandler("formatBlock", "P");
      }
    }
  }
};

export default keyboardShortcuts;
