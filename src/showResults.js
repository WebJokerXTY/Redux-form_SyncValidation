const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//async
export default (async function showResults(values) {
    //模拟服务器延迟
    await sleep(500);
    //JSON.stringify(value, replacer, space)
    //value指将要序列化成JSON字符串的值
    //replacer为null，对象所有属性都会被序列化
    //space指缩进用的空白字符串，用于美化输出
    //ES6的新语法，模板字符串，可以换行、嵌入变量和原生输出
    //小撇号使用tab键上面的引号``， 非enter键旁边的引号''
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});