const argv = require("yargs").argv;
const { createFiles, getFiles, getFileInfo } = require("./files");

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFiles(fileName, content);
      break;

    case "getFiles":
      getFiles();
      break;

    case "getInfo":
      getFileInfo(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
