var express = require('express');
var router = express.Router();
const path = require('path');
const accModel = require('../../../templet/modules/accountM');
// const shortid = require('shortid');



/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' }); 不使用ejs
    fileName = path.join(__dirname, '../../public', 'html/index.html');
    res.sendFile(fileName);
});
router.get('/account', function (req, res, next) {
    fileName = path.join(__dirname, '../../public', 'html/account.html');
    res.sendFile(fileName);
})
router.get('/detail', function (req, res, next) {
    accModel.find().sort({时间:-1}).then(list => {
        res.render('detail', { list });
    }).catch(err => {
        res.status(500).send(err);
    })
    
})
router.post('/detail', function (req, res, next) {
    accModel.create({...req.body,时间:new Date(req.body.时间)}).then((result) => {
        res.render('success',
            { msg: '成功', url: '/detail', data: { respond: { data: 'ok', msg: '响应成功', id:result._id  } } })
    })
    .catch(err => {res.status(500).send(err)})
    // let countId = shortid.generate();
    // db.get('account').unshift({id:countId, ...req.body}).write();
    //可以使用shortid
    
    
})
router.get('/detail/:id',(req,res) => {
    let qid = req.params.id;
    accModel.deleteOne({_id:qid}).then(() => {
        res.render('success', { msg: '删除成功', url: '/detail', data: { respond: { data: 'ok', msg: '响应成功', id: qid } } });
    }).then(err => res.status(500).send(err));
    
})


module.exports = router;
