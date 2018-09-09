const { contract } = require("../package.json");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../../spec.json");
const contractJSON = JSON.stringify(contract);
fs.writeFile(filePath, contractJSON, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("The spec was created!");
});
