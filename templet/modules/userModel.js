/*记账本的用户模块  */
const CreateModel = require('../modelTem');
let userSchame = {
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
}
let userModel = CreateModel('userAuth', userSchame);
module.exports = userModel;