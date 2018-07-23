"use strict";
const fs = require("fs");
const path = require('path');

const filePath = path.resolve(__dirname, "../resource/testData/txtData/testStr.txt")
let content = fs.readFileSync(filePath, { encoding: "utf-8" });
console.log('length:', [...content].length);
