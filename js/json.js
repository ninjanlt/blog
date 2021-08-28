/**
 * JSON 字符串是一个被称为 JSON 编码（JSON-encoded）
 * 或序列化 （serialized）
 * 或字符串化（stringified）
 * 或编组化（marshalled）的对象
 * 支持转换 Object、Array、Primitives 会忽略函数属性、Symbol属性、undefined，并且不能有循环引用
 * 
 */
JSON.stringify(obj) //转化成字符串
JSON.parse(str)	  //转换成对象
 
// 反序列时间字符串
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
 
let meetup = JSON.parse(str, function(key, value) {
   if (key == 'date') return new Date(value);
   return value;
})
 
// 深度克隆
JSON.parse(JSON.stringify(target))