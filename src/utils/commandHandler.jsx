const commandHandler = (cmd, value = null) => {
  document.execCommand(cmd, false, value);
};

export default commandHandler;
