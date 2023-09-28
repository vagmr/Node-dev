const CreateModel = require('../modelTem');
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
exports.books2Model = books2Model;