const updateContent = (newBlocks) => {
  const currentSelection = window.getSelection();
  const currentState = {
    blocks,
    selection: {
      start: currentSelection.anchorOffset,
      end: currentSelection.focusOffset,
    },
  };
  setUndoStack([...undoStack, currentState]);
  setBlocks(newBlocks);
  setRedoStack([]);
};
