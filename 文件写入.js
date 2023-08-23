const fs = require('fs');
fs.writeFile('名言.txt', '大丈夫生于天地之间，岂能郁郁久居人下', err => {
    if (err) { console.log('写入失败'); return; }
    console.log('写入成功');
})
//同步写入
fs.writeFileSync('test.txt', '大丈夫生于天地之间，岂能郁郁久居人下');
//实现一个从文件中读取，并逐行写入到其他文件中的功能；
//抽取到函数中
const write = () => {
    let count = 1;
    return (data) => {
        fs.appendFile('./名言.txt', data, err => {
            if (err) { console.log('写入失败'); return; }
            data = `第${count}行的内容为` + data;
            console.log(data);
            count++;
        })
    }
}
const writeOut = write();
filePath = './励志名言集合.txt';
const rs = fs.createReadStream(filePath, 'utf-8');
let lineBuffer = '';
rs.on('data', chunk => {
    lineBuffer += chunk;
    let lines = lineBuffer.split('\n');
    lineBuffer = lines.pop();//令lineBuffer等于最后一行的内容    
    for (let line of lines) {

        writeOut(line);
    }
})
rs.on('end', () => {
    //如果最后一行还有内容
    if (lineBuffer) {
        writeOut(lineBuffer);
    }
})
rs.on('error', (err) => {
    console.error('读取失败', err);
})
fs.appendFile('./名言.txt', '\n天行健,君子以自强不息', err => {
    if (err) { console.log('写入失败'); return; }
    console.log('写入成功');
})
//这样也能实现追加写入
fs.writeFile('名言.txt', '大丈夫生于天地之间，岂能郁郁久居人下', { flag: 'a' }, err => {

})