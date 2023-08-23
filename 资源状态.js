const fs = require('fs');
fs.stat('./资料/cc.mp4', (err, data) => {
    if (err) { console.error('读取失败', err); return; }
    //检测是否是文件
    console.log(data.isFile());
    console.log('文件大小为:' + (data.size / 1024 / 1024).toFixed(2) + 'mb');
})