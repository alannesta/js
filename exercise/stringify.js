var obj = {
	key1: "value1",
	key2: "value2",
	key3: {
		key4: "value3"
	}
	//date: new Date(),
	//arr: [1, 2, "game", "test"]
};

var arr = ["test", {key: "value"}, {key: [1, 2]}];
//
//console.log(JSON.stringify(obj));
//console.log(JSON.stringify(arr));
//
var str = '[{"id":68,"feed_name":"腾讯ISUX – 社交用户体验设计","feed_url":"http://isux.tencent.com/feed","last_update":"2016-04-08T17:49:20.000Z"},{"id":70,"feed_name":"大搜车前端团队博客","feed_url":"http://f2e.souche.com/blog/rss/","last_update":"2016-04-08T14:16:36.000Z"},{"id":79,"feed_name":"美团点评技术团队","feed_url":"http://tech.meituan.com/atom.xml","last_update":"2016-04-07T19:58:45.000Z"},{"id":80,"feed_name":"FEX 百度 Web 前端研发部","feed_url":"http://fex.baidu.com/feed.xml","last_update":"2016-04-08T14:16:42.000Z"},{"id":81,"feed_name":"JerryQu 的小站","feed_url":"https://imququ.com/rss.html","last_update":"2016-04-08T14:16:50.000Z"},{"id":83,"feed_name":"Taobao FED | 淘宝前端团队","feed_url":"http://taobaofed.org/atom.xml","last_update":"2016-04-08T14:16:51.000Z"},{"id":84,"feed_name":"Web前端 腾讯AlloyTeam  Blog | 愿景: 成为地球卓越的Web团队！","feed_url":"http://www.alloyteam.com/feed/","last_update":"2016-04-08T14:17:04.000Z"}]';
//console.log(JSON.parse(str) instanceof Array);
//console.log(typeof JSON.parse(str));

function shanzhaiStringify(obj) {
	var result = '';

	if (obj instanceof Array) {
		result += "[";
		for (var i=0; i<obj.length; i++) {
			result += shanzhaiStringify(obj[i]);
			if (i !== obj.length-1) {
				result+= ","
			}
		}
		result += "]"
	//TODO: handle stuff like Date .etc
	} else if (typeof obj === "object") {
		result += "{";

		var keys = Object.keys(obj);
		keys.forEach(function(key, index) {
			result += '"' + key + '":' + shanzhaiStringify(obj[key]);
			if (index != keys.length - 1) {
				result += ",";
			}
		});
		result += "}";
	} else  {
		result += '"' + obj.toString() + '"';
	}

	return result;
}

//console.log(JSON.parse(shanzhaiStringify(obj)).key3.key4);
//console.log(JSON.parse(shanzhaiStringify(arr)) instanceof Array);
console.log(shanzhaiStringify(JSON.parse(str)));
