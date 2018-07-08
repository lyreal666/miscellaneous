'use strict';
const fs = require('fs');

const filePath = '../testData/txtData/testStr.txt';

let qsMap = new Map();

let content = fs.readFileSync(filePath, 'utf-8');
console.log([...content].length);
const pattern = /(#\s(\d+\s){7}(\n\*.*?){6})/mgu;

let match;
console.log(pattern.exec(content));
console.log(/\d+/.exec('aaa1111'));