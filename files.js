const path = require("path");
const fs = require("fs/promises");
const validateData = require("./halpers/validateData");
const checkExtention = require("./halpers/checkExtention");

async function createFiles(fileName, content) {
  const file = {
    fileName,
    content,
  };

  const validationResult = validateData(file);
  //   console.log(validationResult.error.details[0]);
  if (validationResult.error) {
    console.log(
      `Please specify ${validationResult.error.details[0].path[0]} parameter`
    );
    return;
  }

  const checkFile = checkExtention(fileName);
  if (!checkFile.result) {
    console.log(
      `Sorry this app doesn't support files with ${checkFile.extention} extention`
    );
    return;
  }

  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("file was created succsesful");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createFiles,
};
