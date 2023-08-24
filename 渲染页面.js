const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    })
    req.on('end', (err) => {
        if (err) return console.log('读取失败', err);
        console.log(body + '这是请求体');
    })
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    fs.readFile('./首页.html', (err, data) => {
        if (err) { console.log('读取失败', err); return; }
        res.end(data);
    })
})
server.listen(3000, () => {
    console.log('启动成功');
})