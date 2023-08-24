const http = require('http');
const server = http.createServer((request, response) => {
    //获取请求方法
    console.log(request.method);
    //获取请求路径
    console.log(request.url);//只包含请求路径
    // //获取http的版本
    // console.log(request.httpVersion);
    //获取请求头
    console.log(request.headers.host);
    //设置响应头，避免中文乱码
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.end('hello world');//设置响应体

});
server.listen(3000, () => {
    console.log('启动成功');
});