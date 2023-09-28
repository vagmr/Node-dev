const { connect } = require('./templet/templet');
const { books2Model } = require('./templet/modules/booksModule');


connect(() => {


    //查询多条数据
    books2Model.find().then(res => console.log(res));
    //查询单条数据
    books2Model.findOne({ author: "vagmr" }).then(res => console.log(res)).catch(err => console.log(err))
}, () => { })

