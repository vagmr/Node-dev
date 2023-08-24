const http = require('http');
// const url = require('url');
const server = http.createServer((req, res) => {
    //第一种方式
    // const paramU = url.parse(req.url, true);
    // console.log(paramU.query.wd);
    //第二种方式(推荐)
    const Url = new URL(req.url, 'http://localhost:3000');
    console.log(Url.searchParams.get('wd'));
    res.end('hello world');
})
server.listen(3001, () => {
    console.log('启动成功');
});