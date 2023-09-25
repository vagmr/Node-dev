const http = require('http');
const fs = require('fs');
const path = require('path');
let mines = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}
const server = http.createServer((req, res) => {
    let { pathname } = new URL(req.url, 'http://localhost:3000');
    //不能在这里设置res.setHeader('content-type', 'text/html;charset=utf-8')
    let filePath = path.join(__dirname, 'src', pathname);
    //获取文件后缀名
    let ext = path.extname(filePath).slice(1);
    console.log(ext);
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            switch (err.code) {
                case 'ENOENT':
                    res.statusCode = 404;
                    res.end('<h1>404 Not Found</h1>');
                    break;
                case 'ENOTDIR':
                    res.statusCode = 403;
                    res.end('<h1>403 Forbidden</h1>');
                    break;
                default:
                    res.statusCode = 500;
                    res.end('<h1>500 Internal Server Error</h1>');
                    break;
            }
            return;
        }
        //通过后缀名拿到文件类型
        let type = mines[ext] || 'application/octet-stream';
        //通过文件类型设置响应标头
        res.setHeader('content-type', type + ';charset=utf-8'); res.setHeader('type', type);
        res.end(data);
    })
})
server.listen(3000, () => {
    console.log('启动成功');
})