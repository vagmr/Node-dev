const express = require('express');
const path = require('path');
const fs = require('fs');
//定义中间件函数
const logMiddleware = (req, res, next) => {
    let { url, ip } = req;
    fs.appendFile(path.join(__dirname, 'log.txt'), `${url} \t ${ip}\n`, err => {
        if (err) {
            console.log(err);
            fs.appendFileSync(path.join(__dirname, 'log.txt'), `${err}`);
            return;
        };
        next();
    })
}
const static = express.static(path.join(__dirname, 'src'));

const app = express();
//使用中间件函数和静态资源路径
app.use(logMiddleware).use(static);
app.get('/', (req, res) => {
    res.send('欢迎来到首页');
})
app.get('/admin', (req, res) => {
    res.send('欢迎来到后台');
})
app.get('/page', (req, res) => {
    res.send('欢迎来到页面');
    res.redirect('/');
})
app.all('*', (req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, './404.html'));
})
app.listen(3000, () => {
    console.log('启动成功');
})