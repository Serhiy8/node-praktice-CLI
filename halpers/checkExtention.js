function checkExtention(fileName) {
  const EXTENTIONS = ["txt", "js", "css", "html", "json"];
  const extention = fileName.split(".").pop();

  const result = EXTENTIONS.includes(extention);

  return { extention, result };
}

module.exports = checkExtention;
