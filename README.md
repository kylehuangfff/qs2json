str2JSON 复杂结构的查询字符串到JSON对象的转换
====

## 快速上手

获得 str2JSON 后，你只需要引入一个文件：

```
../dist/str2JSON.min.js
```

使用RequireJS进行加载：

```
require(['../dist/str2JSON.min'], function(str2JSON){
    console.log(str2JSON);
});
```

在Node中使用：

```
var str2JSON = require('./dist/str2JSON.min');
```

## 示例
```
    str2JSON('a=1&b=2');
    //=> {"a":"1","b":"2"}

    str2JSON('a.p1=1&a.p2=2');
    //=> {"a":{"p1":"1","p2":"2"}}
    
    str2JSON('a[]=1&a[]=2');
    //=> {"a":["1","2"]}
    
    str2JSON('a.b.c.d.e=1');
    //=> {"a":{"b":{"c":{"d":{"e":"1"}}}}}
    
    str2JSON('a.b.arr[]=1&a.b.arr[]=2');
    //=> {"a":{"b":{"arr":["1","2"]}}}
```