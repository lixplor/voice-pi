/**
 * 获取汽车相关信息
 * 油价
 * 限行
 */

var URL = require("../utils/url")
var httpUtils = require("../utils/httpUtils");
var cheerio = require("cheerio");

module.exports = {
	// 获取三天限行信息
	getCarLimitInfo: function getCarLimitInfo() {
		return new Promise(function(resolve, reject) {
			httpUtils.get(URL.CAR_LIMIT)
				.then(function(response){
					var $ = cheerio.load(response.body);
		            // 限行
		            var todayLimit = $("body > div.main.wrap > div.right_side > div.container > ol:nth-child(3) > table > tbody > tr > td:nth-child(1) > div.f24.l200").text();
		            var secondDayLimit = $("body > div.main.wrap > div.right_side > div.container > ol:nth-child(3) > table > tbody > tr > td:nth-child(2) > div.f24.l200").text();
		            var thirdDayLimit = $("body > div.main.wrap > div.right_side > div.container > ol:nth-child(3) > table > tbody > tr > td:nth-child(3) > div.f24.l200").text();
		            // 返回
		            resolve([todayLimit, secondDayLimit, thirdDayLimit])
				})
				.catch(function(error){
					reject(error);
				});
		});
	},
	/**
	 * 获取车牌尾号
	 * @param  {[type]} carFullNumber 完整车牌号码
	 * @return {[type]}               车牌号码最后一位数字; 查找不到时返回-1
	 */
	getCarLastNumber: function getCarLastNumber(carFullNumber) {
	    var lastNumber = -1;
	    for (var i = 0; i < carFullNumber.length; i++) {
	        var ch = carFullNumber.charAt(i);
	        var last = parseInt(ch, 10);
	        if (!isNaN(last)) {
	            lastNumber = last; 
	        }
	    }
	    return lastNumber;
	},
	/**
	 * 根据尾号和限行规则判断是否被限行
	 * @param  {[type]}  limitRule     限行尾号规则, 如1和5
	 * @param  {[type]}  carLastNumber 要查询的汽车尾号
	 * @return {Boolean}               true表示当前尾号被限行; 否则false
	 */
	isCarLimit: function isCarLimit(limitRule, carLastNumber) {
		return limitRule.indexOf(carLastNumber) >= 0;
	},
	// 根据是否限行获取文案
	getCarLimitText: function getCarLimitText(limitRule, carLastNumber) {
		if (this.isCarLimit(limitRule, carLastNumber)) {
			return "是被限行的号码, 不能开车上路. ";
		} else {
			return "不在限行名单, 可以开车上路. ";
		}
	},
	// 获取文案
	getFullCarLimitText: function getFullCarLimitText(limitRule, carNumber) {
		var lastNumber = this.getCarLastNumber(carNumber);
		var carLimitText = this.getCarLimitText(limitRule, lastNumber);
		return "限行尾号为: " + limitRule + ". "
			+ "您的爱车" + carNumber + "的尾号为" + lastNumber + ", "
			+ carLimitText;
	}
}

