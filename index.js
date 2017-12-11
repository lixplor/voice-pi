/**
 * 语音Pi助手
 */
var childProcess = require("child_process");
var later = require("later");
var url = require("./utils/url");
var mplayerUtils = require("./utils/mplayerUtils");
var httpUtils = require("./utils/httpUtils");
var datetimeUtils = require("./utils/datetimeUtils");
var radioUtils = require("./utils/radioUtils");
var car = require("./modules/car");
var weather = require("./modules/weather");
var radioList = require("./resources/radioList");
var conf = require("./conf/conf");

// 早晨任务
function morningTask() {
	// 先播音乐
	mplayerUtils.play(conf.music.morningMusic);
	// 获取当前时间
	var dateTime = datetimeUtils.getDateString() + ", " + datetimeUtils.getWeekString() + ". ";
	// 获取城市编码
	var cityCode = weather.getCityCode(conf.location.city);
	// 获取车牌号
	var carNumber = conf.car.carNumber;
	// 获取今天天气
	weather.getWeatherInfo(cityCode)
		.then(function(weather) {
			// 获取尾号限行
			return new Promise(function(resolve, reject) {
				car.getCarLimitInfo()
					.then(carLimitInfo => {
						resolve({
							weather: weather,
							carLimitInfo: carLimitInfo
						});
					})
					.catch(error => reject(error));
			});
		})
		.then(function(data){
			// 获取天气预警
			return new Promise(function(resolve, reject){
				weather.getWeatherAlarm(conf.location.province, conf.location.city)
					.then(function(alarmInfo){
						resolve({
							weather: data.weather,
							carLimitInfo: data.carLimitInfo,
							alarmInfo: alarmInfo
						});
					})
					.catch(error => console.log(error));
			});
			
		})
		.then(function(data){
			// 获取车辆限行文案
			var limitText = car.getFullCarLimitText(data.carLimitInfo[0], carNumber);
			// 获取广播
			var radio = radioUtils.getRadioByTitle(conf.radio.morningRadio);
			// 判断是否有预警信息
			var alarmInfo;
			if (data.alarmInfo) {
				alarmInfo = data.alarmInfo + ". ";
			} else {
				alarmInfo = "今天没有气象预警信息. ";
			}
			// 拼接文案
			var speech = "悠扬的旋律为您送来清晨的第一声问候, 祝您在新的一天心情舒畅, 生活愉快. "
					+ "今天是" + dateTime
					+ "今天天气: " + data.weather.today.weather
					+ "今天的" + data.weather.today.index
					+ alarmInfo
					+ "当前气温: " + data.weather.current.weather
					+ "今天的" + limitText
					+ "愉快的心情从清晨开始, 健康的生活从早餐开始. 为了保持一整天的精力, 早餐要吃的有营养. 建议搭配含有蛋白质, 维生素, 膳食纤维多的食物, 如牛奶或豆浆, 水果或蔬菜, 鸡蛋, 面包."
					+ "接下来为您播放: " + radio.title;
			console.log(speech);
			mplayerUtils.speak(speech);
			radioUtils.play(radio, 1);
		})
		.catch(error => console.log(error));
		// TODO 当网络请求失败, 仍然要语音播报
}

function noonTask() {
	// 先播音乐
	mplayerUtils.play(conf.music.noonMusic);
	// 获取广播
	var radio1 = radioUtils.getRadioByTitle(conf.radio.noonRadio1);
	var radio2 = radioUtils.getRadioByTitle(conf.radio.noonRadio2);
	// 拼接文案
	var speech = "中午好, 午餐时间到了. 健康的午餐应以五谷为主, 配合大量蔬菜, 瓜类及水果, 适量肉类, 蛋类及鱼类食物, 并减少油, 盐, 及糖分, 要讲究1:2:3的比例, 即六分之一是肉或鱼或蛋类, 六分之二是蔬菜, 六分之三是饭或粉, 要注意三低一高, 即低油, 低盐, 低糖, 高纤维. "
			+ "接下来为您播放: " + radio1.title;
	console.log(speech);
	mplayerUtils.speak(speech);
	radioUtils.play(radio1, 1);
}

function eveningTask() {
	// 先播音乐
	mplayerUtils.play(conf.music.eveningMusic);
	// 拼接文案
	var speech = "晚上好, 早吃好, 晚吃少, 已被许多人当作健康的守则, 晚餐要少而精, 搭配合理. 建议少吃高油, 高热量, 高钙等食物, 要多吃素食, 以清淡为主, 尽量少吃或者不吃荤食. ";
	console.log(speech);
	mplayerUtils.speak(speech);
}

function nightTask() {
	// 获取当前时间
	var time = datetimeUtils.getHour();
	// 获取城市编码
	var cityCode = weather.getCityCode(conf.location.city);
	// 获取车牌号
	var carNumber = conf.car.carNumber;
	// 获取明天天气
	weather.getWeatherInfo(cityCode)
		.then(function(weather) {
			// 获取尾号限行
			return new Promise(function(resolve, reject) {
				car.getCarLimitInfo()
					.then(carLimitInfo => {
						resolve({
							weather: weather,
							carLimitInfo: carLimitInfo
						});
					})
					.catch(error => reject(error));
			});
		})
		.then(function(data){
			// 获取车辆限行文案
			var limitText = car.getFullCarLimitText(data.carLimitInfo[1], carNumber);
			// 获取广播
			var radio = radioUtils.getRadioByTitle(conf.radio.morningRadio);
			// 拼接文案
			var speech = "亲爱的朋友, "
					+ "现在是" + time  + "点. "
					+ " 夜已深. 最后为您播报明天的天气和限行信息. "
					+ "明天天气: " + data.weather.tomorrow.weather
					+ "明天的" + limitText
					+ "今天的语音服务就要结束了, 最后为您送上优美的音乐, 祝您好梦, 明早再见. ";
			console.log(speech);
			mplayerUtils.speak(speech);
			// 播音乐
			mplayerUtils.play(conf.music.nightMusic);
			
		})
		.catch(error => console.log(error));
		// TODO 当网络请求失败, 仍然要语音播报
}


later.date.localTime();
// 早晨任务
var morningCron = later.parse.cron("0 7 * * *");
later.setInterval(morningTask, morningCron);
// 中午任务
var noonCron = later.parse.cron("0 12 * * *");
later.setInterval(noonTask, noonCron);
// 傍晚任务
var eveningCron = later.parse.cron("0 19 * * *");
later.setInterval(eveningTask, eveningCron);
// 夜间任务
var nightCron = later.parse.cron("0 23 * * *");
later.setInterval(nightTask, nightCron);

