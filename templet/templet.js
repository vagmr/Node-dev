/**
 * mongo文件模板
 * @param {any} 'mongoose'
 * @returns {*} {mongo, connect}
 */
const mongo = require('mongoose');

const connect = function (success, err) {
    mongo.connect("mongodb://127.0.0.1:27017/vagmr");
    mongo.connection.once('open', () => {
        console.log("连接成功");
        success()

    });
    mongo.connection.on('error', (err) => {
        console.log('发生错误');
        console.log(err);
        err()
    })
    mongo.connection.on('close', () => {
        console.log('连接关闭');
    })
}
module.exports = {
    mongo, connect
}