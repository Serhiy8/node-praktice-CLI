const path = require("path");
const fs = require("fs/promises");
const validateData = require("./halpers/validateData");
const checkExtention = require("./halpers/checkExtention");
const folderPath = path.join(__dirname, "./files");

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

async function getFiles() {
  const data = await fs.readdir(folderPath);
  if (!data.length) {
    console.log("Sorry there are no files in this folder");
    return;
  }
  data.forEach((file) => console.log(file));
}

async function getFileInfo(fileName) {
  const data = await fs.readdir(folderPath);
  if (!data.includes(fileName)) {
    console.log(`Sorry there is no file ${fileName} in this folder `);
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  const result = await fs.readFile(filePath, "utf-8");
  console.log(result);
  const extention = path.extname(fileName);
  const name = path.basename(filePath, extention);
  const content = result;
  const fileDateAt = await fs.stat(filePath);
  const createdAt = fileDateAt.birthtime;

  console.log({ content, name, extention, createdAt });
}

module.exports = {
  createFiles,
  getFiles,
  getFileInfo,
};
