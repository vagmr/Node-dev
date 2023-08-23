const { log } = require('console');
const fs = require('fs');
const path = require('path');
//斜杠/反斜杠\
log(path.resolve(__dirname, '../绝对路径.js'));//../会返回上一级
log(__filename);
let str = 'H: \\new project\\Node - dev\\绝对路径.js';
log(path.parse(str));