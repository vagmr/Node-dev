const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    let { pathname } = new URL(req.url, 'http://localhost:3000');
    let filePath = __dirname + '/src' + pathname;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) { res.statusCode = 500; res.end('读取失败'); return; }
        res.end(data);
    })
})
server.listen(3000, () => {
    console.log('启动成功');
})