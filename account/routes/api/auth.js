var express = require('express');
var router = express.Router();
const userModel = require('../../../templet/modules/userModel');
const jwt = require('jsonwebtoken');

//导入md5对密码进行加密
const md5 = require('md5');


//登录操作
router.post('/token', (req, res) => {
    //解构获取登录表单中的数据
    let { username, password } = req.body;
    //在数据库中查找对应的用户名和加密后的密码
    userModel.findOne({ username, password: md5(password) }).then(result => {
      let token = jwt.sign({
           id: result._id,
           username: result.username
       },'vagmr',{expiresIn: 60 * 60 })
        res.json({code:'0000',msg:'登录成功',data:{token,server:'vagmr'}});
    }).catch(() => {
        res.json({code:'0001',msg:'用户名或密码错误',data:null})
    })
})
//退出登录操作，改成post规避跨站攻击
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: "退出成功", url: '/', data: { respond: { id: null } } });
    })
})
module.exports = router;
