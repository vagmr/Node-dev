import express from 'express';
import parser  from 'cookie-parser';
//导入session生成工具
import session from 'express-session';
//保存到mongodb
import MongoStore from 'connect-mongo';

const app = express();
//使用库解析cookie
app.use(parser());
//使用库生成session
app.use(session({
    name:'uid', //session的名字
    secret:'vagmr', //密钥
    saveUninitialized:false,//在不需要session时，是否生成session
    resave:true, //每次请求都更新session
    store:MongoStore.create({ //创建session仓库
        mongoUrl:'mongodb://127.0.0.1:27017/vagmr' //仓库地址
    }),
    cookie:{
        httpOnly:true,//禁止前端通过document.cookie获取操作
        maxAge:60 * 1000 * 30
    }
}))
//设置cookie的接口
app.get('/api',(req,res) => {
    res.cookie('vagmr','76C2E5A2188A840F4B1845F96349F3D6');//浏览器退出就会被销毁
    res.cookie('wel','E01EEED093CB22BB',{maxAge:60*1000*60});//一个小时销毁
    res.send({code:1,msg:'ok'});
})
//删除cookie的接口
app.delete('/api',(req,res) => {
    res.clearCookie('vagmr');
    res.send({code:1,msg:'删除成功'});
})
//获取cookie
app.get('/getApi',(req,res) => {
   let cok = req.cookies;
   console.log(cok);
    res.json({
        code:1,
        msg:'获取成功',
        data:cok
    })
})
//创建session，登录接口
app.get('/login',(req,res) => {
    if(req.query.username === 'admin'&& req.query.password === 'admin'){
        //设置session
        req.session.username = req.query.username;
        res.json({code:'0001',msg:'登录成功'});
    }else{
        res.json({code:'0000',msg:'登录失败'});
    }
})
//session的读取，获取购物车接口
app.get('/cart',(req,res) =>{
    if(req.session.username){
        res.json({
            code:'0001',
            msg:'读取成功',
            data:{
                code:200,
                data:{shop:"pc",price:200,num:1}
            }
        })
    }
    else{
        res.json({
            code:'0000',
            msg:'读取失败,请先登录',
            data:null
        })
    }
})
//退出登录接口,销毁session
app.get('/logout',(req,res) =>{
    req.session.destroy(() =>{
        res.json({
            code:'0001',
            msg:'退出成功'
        })
    })
})
app.listen(3000,() => {
    console.log('listening on 3000');
});