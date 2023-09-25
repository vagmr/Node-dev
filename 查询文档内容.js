const { connect } = require('./templet/templet');
const CreateModel = require('./templet/modelTem');

connect(() => {
    let booksSchema = {
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
    }
    let books2Model = CreateModel('books2', booksSchema);
    //查询多条数据
    books2Model.find().then(res => console.log(res));
    //查询单条数据
    books2Model.findOne({ author: "vagmr" }).then(res => console.log(res)).catch(err => console.log(err))
}, () => { })

