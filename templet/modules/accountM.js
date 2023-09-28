const CreateModel = require('../modelTem');
let accountSchame = {
   事项: {
      type: String,
      required: true    
   },
   时间:Date,
   类型:{
    type:String,
    default:-1,
   },
   金额:{
    type:Number,
    required:true
   },
   备注:String

}
let accModel = CreateModel('account', accountSchame);
module.exports = accModel;