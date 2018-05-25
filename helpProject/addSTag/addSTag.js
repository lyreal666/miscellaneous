'use strict';

const fs = require('fs'),
    path = require('path');

const file_path = './test';
const result_path = './result.txt';

const fileList1 = fs.readdirSync(file_path); // test文件下文件列表
fs.writeFileSync(result_path, '');

for (let f1 of fileList1) { // 应该是dir1,dir2...
    const file_path1 = path.join(file_path, f1);// 把文件名和路径拼起来
    if (fs.lstatSync(file_path1).isDirectory()) { // 如果是路径
        const fileList2 = fs.readdirSync(file_path1);
        for (let f2 of fileList2) { // 应该是fask0...
            const file_path2 = path.join(file_path1, f2);
            if (fs.lstatSync(file_path2).isDirectory()) {
                const fileList3 = fs.readdirSync(file_path2);
                for (let f3 of fileList3) {
                    const file_path3 = path.join(file_path2, f3);
                    if (fs.lstatSync(file_path2).isDirectory()) {
                        if (path.extname(f3) === '.txt') {
                            let words = fs.readFileSync(file_path3, 'utf-8');
                            const pattern = /0?\s+\d+\s+(.*)/;
                            if (pattern.test(words)) {
                                let rWords = pattern.exec(words)[1].toUpperCase();
                                rWords = rWords.replace(/\.|\?|!/g, '');
                                rWords = `<s>${rWords}</s>\n`;
                                fs.appendFileSync(result_path, rWords)
                            }

                        }
                    }
                }
            }
        }
    }

}