const mongo = require('mongoose');
mongo.connect('mongodb://127.0.0.1:27017/vagmr');
mongo.connection.once('open', () => {
    console.log('连接成功');
    let booksSchema = new mongo.Schema({
        name: {
            type: String,
            required: true
        }, price: {
            type: Number,
            default: 0
        }, author: {
            type: String,
            default: "匿名"
        }, type: {
            type: String,
            enum: ['科技', '重生', '爱情', '文学', '悬疑', '古典', '现实']
        }, id: {
            type: String,
            unique: true
        },
        is_hot: {
            type: Boolean,
            default: false
        }
    })
    let modelBook = mongo.model('books2', booksSchema);
    /* 
    测试逻辑运算符 
    modelBook.find({ price: { $ne: 100 } }).then(res => {
         console.log(res);
     }).catch(err => console.log(err)) */
    /*
    测试or操作 
    modelBook.find({ $or: [{ author: 'vagmr' }, { price: { $gt: 70 } }] }).then(res => {
        console.log(res);
    }).catch(err => console.log(err)) */
    /* 
    测试and查询
    modelBook.find({ $and: [{ author: '东野圭吾' }, { id: "007" }] }).then(res => {
        console.log(res);
    }).catch(err => console.log(err)) */
    /*
    正则表达式使用 
    modelBook.find({ name: new RegExp('人') }).then(res => {
        console.log(res);
    }).catch(err => console.log(err))
 */
    modelBook.find().select({ name: 1, price: 1, _id: 0 }).sort({ price: 1 }).then(res => console.log(res))
        .catch(err => console.log(err));

    modelBook.find().select({ name: 1, price: 1, _id: 0 }).skip(0).limit(3)
        .sort({ price: 1 }).then(res => console.log(res))
        .catch(err => console.log(err));
});

mongo.connection.on('error', (err) => {
    console.log('发生错误');
    console.log(err);
})
mongo.connection.on('close', () => {
    console.log('连接关闭');
})
