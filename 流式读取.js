const fs = require('fs');
const rs = fs.createReadStream('./资料/cc.mp4');
rs.on('data', chunk => {
    console.log(chunk);
})