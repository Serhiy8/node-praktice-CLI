const argv = require("yargs").argv;
const { createFiles } = require("./files");

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFiles(fileName, content);
      break;

    case "":
      break;

    case "":
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
