var ejs = require('ejs');
var hero = ['大丈夫', '燕双鹰', '张飞', '超人', '赵云'];
var template = "\n<ul>\n<% hero.forEach(el => { %>\n    <li><%= el %></li>\n<%  });%>\n</ul>\n";
var res = ejs.render(template, { hero: hero });
console.log(res);
