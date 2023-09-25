const ejs: any = require('ejs');
let hero: string[] = ['大丈夫', '燕双鹰', '张飞', '超人', '赵云'];
const template: string = `
<ul>
<% hero.forEach(el => { %>
    <li><%= el %></li>
<%  });%>
</ul>
`;
const res = ejs.render(template, { hero });
console.log(res);
