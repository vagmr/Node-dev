let buf = Buffer.alloc(10);//创建一个10字节的buffer，会做数据归零处理
console.log(buf);
let buf2 = Buffer.allocUnsafe(10);//速度更快，但是会遗留之前的内存数据
console.log('---------------');
console.log(buf2);
let buf3 = Buffer.from('hello');//创建一个指定内容的buffer
console.log(buf3);
let buf4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf4);
console.log('转换后为：' + buf4.toString());
console.log(buf4[0].toString(16));//读取buffer中的第一个字节的16进制