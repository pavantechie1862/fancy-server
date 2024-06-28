const path = require("path");
const fs = require("fs");

const getBase64Image = (filePath) => {
  const file = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${file.toString("base64")}`;
};

const logoBase64 = getBase64Image(path.join(__dirname, "images/logo.jpeg"));

module.exports = { logoBase64 };
