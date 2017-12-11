/**
 * Http工具类
 */
var request = require("request");

// 获取通用请求头
function getHeader(url) {
	return options = {
	    url: url,
	    headers: {
	        // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
	        // "Accept-Encoding": "gzip, deflate",
	        // "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
	        // "Cache-Control": "max-age=0",
	        // "Connection": "keep-alive",
	        // "Cookie": "tmall=hongbao; bdshare_firstime=1509292889917; Hm_lvt_db764aa219d48d0d5c2e0a56b9b986cf=1512210094,1512217588,1512218157; Hm_lpvt_db764aa219d48d0d5c2e0a56b9b986cf=1512738704",
	        // "Upgrade-Insecure-Requests": "1",
	        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
	    }
	};
}


module.exports = {
	// // 发出get请求
	get:function get(url) {
		return new Promise(function(resolve, reject) {
			request(getHeader(url), function(error, response, body){
		        if (!error && response.statusCode == 200) {
		            resolve(response);
		        } else {
		            reject(error);
		        }
		    });
		});
		
	}
}




      