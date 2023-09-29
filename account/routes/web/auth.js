var express = require('express');
var router = express.Router();
const path = require('path');
const userModel = require('../../../templet/modules/userModel');

//导入md5对密码进行加密
const md5 = require('md5');

//注册页面
router.get('/auth',(req,res) => {
    res.render('auth');
})
//注册操作
router.post('/auth',(req,res) => {
    userModel.create({...req.body,password:md5(req.body.password)}).then(result => {
        res.render('success',{msg:"注册成功",url:'/login',data:{respond:{id:result._id}}});
    }).catch(() => {
        res.render('loginerror',{msg:'请填写完整信息',url:'/auth'});
    })
})
//登录页面
router.get('/login',(req,res) => {
    res.render('login');
})
//登录操作
router.post('/login',(req,res) => {
    //解构获取登录表单中的数据
    let {username,password} = req.body;
    //在数据库中查找对应的用户名和加密后的密码
    userModel.findOne({username,password:md5(password)}).then(result => {
        req.session.username = result.username;
        req.session.uid = result._id;
        res.render('success',{msg:"登录成功",url:'/detail',data:{respond:{id:result._id}}});
    }).catch(() => {
        res.render('loginerror',{msg:"用户名或密码错误",url:'/auth'});
    })
})
//退出登录操作，改成post规避跨站攻击
router.get('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('success',{msg:"退出成功",url:'/',data:{respond:{id:null}}});
    })
})
module.exports = router;
