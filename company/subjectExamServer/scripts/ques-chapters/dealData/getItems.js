const cheerio = require('cheerio');
const fs = require('fs');

const filePath = './view-source_moni.cn.html';
const html = fs.readFileSync(filePath, 'utf-8');
$ = cheerio.load(html);

let jsObj = []
