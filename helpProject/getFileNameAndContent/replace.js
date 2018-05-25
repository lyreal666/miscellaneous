const fs = require('fs');

const file_path = './wintry.mlf';

try{
    let words = fs.readFileSync(file_path, 'utf-8');
    words = words.replace(/"(\w+\d+).lab"/mg, '"\*/$1.lab"');
    fs.writeFileSync('./rs.mlf', words);
} catch (e) {
    console.log(e)
}

///root/node_global/lib/node_modules