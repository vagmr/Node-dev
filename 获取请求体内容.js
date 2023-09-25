const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { router } = require('./路由模块化.js');

const app = express();
app.use(router);
//解析中间件
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//配置路由规则
app.get('/', (req, res) => {
    res.redirect('/login');
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
})
app.post('/login', jsonParser, (req, res) => {
    console.log(req.body);
    //获取请求体内容
    res.send('登录成功');
})
//监听端口
app.listen(3000, () => {
    console.log('启动成功');
})