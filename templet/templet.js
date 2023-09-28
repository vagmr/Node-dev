/**
 * mongo文件模板
 * @param {any} 'mongoose'
 * @returns {*} {mongo, connect}
 */
const mongo = require('mongoose');
const config = {
    DbHost: "127.0.0.1",
    DbPort: "27017",
    DbName: "vagmr"
}

const connect = function (success, err = () => console.log("连接失败"), configs = config) {
    mongo.connect(`mongodb://${configs.DbHost}:${configs.DbPort}/${configs.DbName}`);
    mongo.connection.once('open', () => {
        console.log("连接成功");
        success()

    });
    mongo.connection.on('error', () => {
        err?.()
    })
    mongo.connection.on('close', () => {
        console.log('连接关闭');
    })
}
module.exports = {
    mongo, connect
}