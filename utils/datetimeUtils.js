/**
 * 日期时间工具类
 */

module.exports = {
	// 获取当前年
	getYear: function getYear() {
		return new Date().getFullYear();
	},
	// 获取当前月
	getMonth: function getMonth() {
		return new Date().getMonth() + 1;
	},
	// 获取当前日
	getDate: function getDate() {
		return new Date().getDate();
	},
	// 获取当前星期. 0-6, 0是星期天
	getWeek: function getWeek() {
		return new Date().getDay();
	},
	// 获取当前星期字符串
	getWeekString: function getWeekString() {
		switch(this.getWeek()) {
			case 0:
				return "星期日";
			case 1:
				return "星期一";
			case 2:
				return "星期二";
			case 3:
				return "星期三";
			case 4:
				return "星期四";
			case 5:
				return "星期五";
			case 6:
				return "星期六";
		}
	},
	// 获取当前小时
	getHour: function getHour() {
		return new Date().getHours();
	},
	// 获取当前分钟
	getMinute: function getMinute() {
		return new Date().getMinutes();
	},
	// 获取当前秒
	getSecond: function getSecond() {
		return new Date().getSeconds();
	},
	// 获取当前日期字符串
	getDateString: function getDateString() {
		return this.getYear() + "年" + this.getMonth() + "月" + this.getDate() + "日";
	},
	// 获取当前时间字符串
	getTimeString: function getTimeString() {
		return this.getHour() + "点" + this.getMinute() + "分" + this.getSecond() + "秒";
	},
	// 获取当前日期时间字符串
	getDateTimeString: function getDateTimeString() {
		return this.getYear() + "年" + this.getMonth() + "月" + this.getDate() + "日" + this.getWeekString() + this.getHour() + "点" + this.getMinute() + "分" + this.getSecond() + "秒";
	}
}