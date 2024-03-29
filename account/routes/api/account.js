var express = require('express');
var router = express.Router();
const path = require('path');
//使用token保护接口
const jwt = require('jsonwebtoken');
const accModel = require('../../../templet/modules/accountM');
// const low = require('lowdb');
// const shortid = require('shortid');

/* const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '../data/db.json'));
const db = low(adapter) */
/* GET home page. */
//定义中间件
let checkToken = (req,res,next) => {
    let token = req.get('vagmr_key');
    if(!token){
        return res.json({
            code:'2001',
            msg:'token缺失',
            data:null
        })
    }
    jwt.verify(token, 'vagmr', (err,data) => {
        if(err){
            return res.json({
                code:'2002',
                msg:'token验证失败',
                data:null
            })
        }
        //保存用户信息
        req.info = data;
        next()
    })
}

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' }); 不使用ejs
    fileName = path.join(__dirname, '../../public', 'html/index.html');
    res.sendFile(fileName);
});
router.get('/account', function (req, res, next) {
    fileName = path.join(__dirname, '../../public', 'html/account.html');
    res.sendFile(fileName);
})
router.get('/detail',checkToken ,function (req, res, next) {
    accModel.find().sort({ 时间: -1 }).then(list => {
        console.log(req.info);
        res.json({
            code:"0000",
            msg:"查询成功",
            data:list
        })
    }).catch(err => {
        res.json({
            code:'0001',
            msg:'查询失败',
            data:err
        })
    })

})
//获取单条记账
router.get('/detail/:id',checkToken, function (req, res, next) {
    qid = req.params.id
    accModel.findById(qid).then(list => {
        res.json({
            code: "0000",
            msg: "查询成功",
            data: list
        })
    }).catch(err => {
        res.json({
            code: '0001',
            msg: '查询失败',
            data: err
        })
    })

})
router.post('/detail',checkToken, function (req, res, next) {
    accModel.create({ ...req.body, 时间: new Date(req.body.时间) }).then((result) => {
       res.json({
           code: '0000',
           msg: '添加成功',
           data: result
       })
    }).catch(err => { res.json({ code: '0001', msg: '添加失败', data: err }) })
    // let countId = shortid.generate();
    // db.get('account').unshift({id:countId, ...req.body}).write();
    //可以使用shortid


})
router.delete('/detail/:id',checkToken, (req, res) => {
    let qid = req.params.id;
    accModel.deleteOne({ _id: qid }).then((result) => {
        res.json({
            code:'0001',
            msg:'删除成功',
            data:result
        })
    }).catch(() => {res.json({
        code:'0000',
        msg:'删除失败',
        data:null
    })}
    );

})
router.patch('/detail/:id',checkToken,(req,res) => {
    let qid = req.params.id;
    accModel.updateOne({ _id: qid }, req.body).then((result) => {
        res.json({
            code:'0001',
            msg:'修改成功',
            data:result
        })
    }).catch(() => {
        res.json({
            code:'0000',
            msg:'修改失败',
            data:null
        })
    })
})

module.exports = router;
