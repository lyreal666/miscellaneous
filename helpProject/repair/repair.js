"use strict";

const fs = require('fs');

const filePath1 = './testFile/wintri.mlf';
const filePath2 = './testFile/train.scp';

console.time('读文件');
let content1 = fs.readFileSync(filePath1, 'utf-8');
let content2 = fs.readFileSync(filePath2, 'utf-8');
console.timeEnd('读文件');

console.time('处理文件');
let lines2 = content2.split(/\n/);

let lineIndex = 0;
let lackIndexs = [];
for (; lineIndex < lines2.length; lineIndex++) {
    //console.log(content1)
    lines2[lineIndex] = lines2[lineIndex].trim();
    console.log('正在处理' + lines2[lineIndex] + ': ' + lineIndex);
    const index1 = content1.indexOf(lines2[lineIndex].trim());
    console.log('index1: ' + index1);
    if (index1 === -1) {
        console.log('缺失%s,第%d行', lines2[lineIndex], lineIndex);
        lackIndexs.push(`${lineIndex}: ${lines2[lineIndex].trim()}`);
        let inIndex = lineIndex + 1;
        for (; inIndex < lines2.length; inIndex++) {
            lines2[inIndex] = lines2[inIndex].trim();
            const index2 = content1.indexOf(lines2[inIndex]);
            if (index2 !== -1) {
                content1 = content1.slice(0, index2 - 1) + `"${lines2[lineIndex]}"\nsil\nsp\nsil\nsp\n.\n` +
                    content1.slice(index2 - 1);
                break;
            }
        }

        if (inIndex === lines2.length) {
            content1 =`${content1}"${lines2[lineIndex]}"\nsil\nsp\nsil\nsp\n.\n`;
            break;
        }
    } else {
        console.log('没问题');
    }
}

if (lineIndex !== lines2.length) {
    for (let line in lines2.slice(lineIndex + 1)) {
        content1 = content1 =`${content1}"${line}"\nsil\nsp\nsil\nsp\n.\n`;
    }

}
console.log('共修补了%s条', lackIndexs.length);
console.timeEnd('处理文件');
lackIndexs = lackIndexs.map(ele => ele + 1);
fs.writeFileSync('./log.txt', lackIndexs.join('\n'));
fs.writeFileSync(filePath1, content1);

