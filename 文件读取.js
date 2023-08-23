const fs = require('fs');
fs.readFile('./名言.txt', (err, data) => {
    if (err) { console.error('读取失败', err); return; }
    console.log(data.toString());
})