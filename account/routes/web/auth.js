var express = require('express');
var router = express.Router();
const path = require('path');
const userModel = require('../../../../templet/modules/userModel');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//导入md5对密码进行加密
const md5 = require('md5');
//使用中间件
router.use(session({
    name:'uid', //session的名字
    secret:'vagmr', //密钥
    saveUninitialized:false,//在不需要session时，是否生成session
    resave:true, //每次请求都更新session
    store:MongoStore.create({ //创建session仓库
        mongoUrl:'mongodb://127.0.0.1:27017/vagmr' //仓库地址
    }),
    cookie:{
        httpOnly:true,//禁止前端通过document.cookie获取操作
        maxAge:60 * 1000 * 60 //保存一个小时
    }
}))
//注册页面
router.get('/auth',(req,res) => {
    res.render('auth');
})
//注册操作
router.post('/auth',(req,res) => {
    userModel.create({...req.body,password:md5(req.body.password)}).then(result => {
        res.render('success',{msg:"注册成功",url:'/login',data:{respond:{id:result._id}}});
    }).catch(() => {
        res.render('error');
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
        res.render('success',{msg:"登录成功",url:'/detail',data:{respond:{id:result._id}}});
    }).catch(() => {
        res.render('error',{message:"登录失败,用户名或密码错误",error:{status:'error',stack:this.stack}});
    })
})
module.exports = router;
