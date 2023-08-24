const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    let method = req.method;
    let { pathname } = new URL(req.url, 'http://localhost:3000');
    if (method === 'GET' && pathname === '/login') return res.end('登录页面');
    if (method === 'GET' && pathname === '/reg') return res.end('注册页面');
    //设置响应状态码
    res.statusCode = 404;
    //设置响应描述
    res.statusMessage = 'love you';
    res.setHeader('server', 'vagmr');
    //设置响应内容
    res.write('hello world');//可以设置多个
    res.end('hello world');//只能也必须有一个
})
server.listen(3000, () => {
    console.log('启动成功');
})