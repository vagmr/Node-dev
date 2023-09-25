/**
 *封装构建模型的函数 
 * @param {any} './templet'
 * @returns {any}
 */
const { mongo } = require('./templet');
function CreateModel(name, modelShcame) {
    return mongo.model(name, new mongo.Schema(modelShcame));
}
module.exports = CreateModel;