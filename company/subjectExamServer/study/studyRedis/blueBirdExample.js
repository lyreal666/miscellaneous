const Promise = require('bluebird');
const fs = require('fs');

const readFile = Promise.promisify(fs.readFile);
readFile('../doc/tables.md', {encoding: 'utf-8'}).then(data => console.log(data));