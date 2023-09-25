const express = require('express');
const cors = require('cors');
const app = express();
const singer = require('./signer.json');
//创建跨域请求
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // 你的 HTML 页面的来源
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
//创建路由
app.get('/', (req, res) => {
    //获取请求路径
    console.log(req.path);
    //获取请求参数
    console.log(req.query);
    //获取请求ip
    console.log(req.ip);
    //获取请求头
    console.log(req.headers);
    res.send('hello world');
});
app.post('/login', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        res.send({ msg: '登录成功', data: body });
    })
})
app.listen(3000, () => {
    console.log('启动成功');
})
//获取路由参数
app.get('/:va.rs', (req, res) => {
    console.log(req.params.va);
    let str = singer.find(item => {
        if (item.id === req.params.va);
        return true;
    });
    if (!str) {
        res.statusCode = 404;
        res.end('404 Not Found');
        return
    };
    res.send({ msg: '登录成功', data: str });
})