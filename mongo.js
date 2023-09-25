const mongose = require('mongoose');
// const [book1, book2, book3] = require('./book.json')
mongose.connect("mongodb://127.0.0.1:27017/vagmr");
mongose.connection.once('open', () => {
    console.log('连接成功');
    let booksSchema = new mongose.Schema({
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
            enum: ['科技', '重生', '爱情', '文学', '悬疑']
        }, id: {
            type: String,
            unique: true
        },
        is_hot: {
            type: Boolean,
            default: false
        }
    })
    //创建模型对象
    let booksModel = mongose.model('books2', booksSchema);
    //this is add new data to the database
    /*  booksModel.create({ name: "大丈夫", price: 100, author: "vagmr", id: "002", type: "科技", is_hot: true },
         { name: "燕双鹰", price: 100, id: "003", type: "科技", is_hot: true },
         { name: "三国演义", price: 34.4, author: "陈寿", type: "爱情", id: "004", is_hot: false },
         { name: "活着", price: 50, author: "余华", id: "005", type: "文学", is_hot: true },
         { name: "白夜行", price: 68, author: "东野圭吾", id: "006", type: "悬疑", is_hot: false },
         { name: "嫌疑人X的献身", price: 79.9, author: "东野圭吾", id: "007", type: "悬疑", is_hot: true }
     ).then(res => {
         console.log(res);
     }).catch(err => {
         console.log(err);
     }) */

    //this is delete data from the datatbase,delete many datas
    // booksModel.deleteMany({ is_hot: false }).then(res => { console.log(res) }).catch(err => { console.log(err) })
    /*  only delete one data
     booksModel.deleteOne({ _id: "65111a1a4929e52c71be1b80" }).then(res => {
         console.log(res)
     }).catch(err => { console.log(err) }) */

    /*    update date
       booksModel.updateOne({ id: "002" }, { name: "水浒传" }).then(res => console.log(res))
           .catch(err => console.log(err)) */

    //关闭数据库，实际不会使用   mongose.disconnect();
})
mongose.connection.on('error', (err) => {
    console.log('连接失败', err);
})
mongose.connection.on("close", () => {
    console.log("数据库关闭");
})
