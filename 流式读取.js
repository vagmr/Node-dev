const { log } = require('console');
const fs = require('fs');
const rs = fs.createReadStream('./资料/cc.mp4');
const ws = fs.createWriteStream('./资料/cc2.mp4');
rs.on('data', chunk => {
    ws.write(chunk);
})
rs.on('end', err => {
    if (err) console.log('读取失败', err);
    console.log('读取成功');
    // log(process.memoryUsage()); 48390144,
})
rs.close;
ws.close;
方式二
const data = fs.readFileSync('./资料/cc.mp4');
fs.writeFileSync('./资料/cc3.mp4', data);
log('写入成功');
// log(process.memoryUsage()); 60416000 获取内存使用

//简便写法
/* rs.pipe(ws);//读取流写入 */