/**
 * 天气
 */
var URL = require("../utils/url");
var httpUtils = require("../utils/httpUtils");
var weatherCityCode = require("../resources/weatherCityCode");

module.exports = {
	// 获取天气
	getWeatherInfo: function getWeatherInfo(cityCode) {
		return new Promise(function(resolve, reject) {
			httpUtils.get(URL.WEATHER + cityCode)
				.then(function(response){
					var data = JSON.parse(response.body);
		            if (data.status != "OK") {
		                reject(data.status);
		                return;
		            }
		            // 当前
		            var now = data.weather[0].now;
		            var nowCondition = now.text;
		            var nowTemp = now.temperature;
		            var nowWindDirection = now.wind_direction;
		            var nowWindDegree = now.wind_scale;
		            var nowHumid = now.humidity;
		            var nowAqiValue = now.air_quality.city.aqi;
		            var nowAqiDegree = now.air_quality.city.quality;

		            // 当前预警
		            var alarms = now.alarms;

		            // 今日
		            var today = data.weather[0].future[0];
		            var todayCondition = today.text.replace("/", "转");
		            var todayLowTemp = today.low;
		            var todayHighTemp = today.high;
		            var todayWind = today.wind;

		            // 今日指数
		            var todayIndex = data.weather[0].today;
		            var todayDressIndex = todayIndex.suggestion.dressing.brief;
		            var todayDressDesc = todayIndex.suggestion.dressing.details;
		            var todayFluIndex = todayIndex.suggestion.flu.brief;
		            var todayFluDesc = todayIndex.suggestion.flu.details;
		            var todayCarWashIndex = todayIndex.suggestion.car_washing.brief;
		            var todayCarWashDesc = todayIndex.suggestion.car_washing.details;
		            
		            // 明日
		            var tomorrow = data.weather[0].future[1];
		            var tomorrowCondition = tomorrow.text.replace("/", "转");
		            var tomorrowLowTemp = tomorrow.low;
		            var tomorrowHighTemp = tomorrow.high;
		            var tomorrowWind = tomorrow.wind;

		            // 返回
		            resolve({
		            	current:{
		            		weather: nowCondition + ", 气温: " + nowTemp + "℃, 湿度: " + nowHumid + "%, " + nowWindDirection + "风" + nowWindDegree + "级. ",
		            		aqi: nowAqiValue + ", " + nowAqiDegree + ". ",
		            		alarm: alarms
		            	},
		            	today: {
		            		weather: todayCondition + ", 最低温度: " + todayLowTemp + "℃, 最高温度: " + todayHighTemp + "℃, " + todayWind + ". ",
		            		index: "穿衣指数:" + todayDressIndex + ", " + todayDressDesc + ". 感冒指数:" + todayFluIndex + ", " + todayFluDesc + ". 洗车指数:" + todayCarWashIndex + ", " + todayCarWashDesc + ". "
		            	},
		            	tomorrow:{
		            		weather: tomorrowCondition + ", 最低温度: " + tomorrowLowTemp + "℃, 最高温度: " + tomorrowHighTemp + "℃, " + tomorrowWind + ". "
		            	}
		            });
				})
				.catch(function(error){
					reject(error);
				});
		});
	},
	// 根据城市名获取编码
	getCityCode: function getCityCode(cityName) {
		for (var i = 0; i < weatherCityCode.length; i++) {
			var cityInfo = weatherCityCode[i];
			if (cityInfo.townName.indexOf(cityName) >= 0) {
				return cityInfo.townID;
			}
		}
	},
	// 根据城市名获取灾害预警信息
	getWeatherAlarm: function getWeatherAlarm(provinceName, cityName) {
		var self = this;
		return new Promise(function(resolve, reject) {
			httpUtils.get(URL.ALARM)
				.then(function(response){
					eval(response.body);
		            var alarm = self.getWeatherAlarmUrl(alarminfo.data, provinceName, cityName);
		            // 返回
		            return new Promise(function(resolve, reject){
		            	// 解析网页
		            	httpUtils.get("http://product.weather.com.cn/alarm/webdata/" + alarm[1])
							.then(function(response){
								eval(response.body);
					            // 限行
					            var alarmContent = alarminfo.ISSUECONTENT;
					            // 返回
					            resolve(alarmContent);
							})
							.catch(function(error){
								reject(error);
							});
		            });
				})
				.then(function(alarmContent) {
					resolve(alarmContent);
				})
				.catch(function(error){
					reject(error);
				});
			});
	},
	// 根据城市名查找对应的预警URL
	getWeatherAlarmUrl: function getWeatherAlarmUrl(arr, provinceName, cityName) {
		var location = provinceName + "省" + cityName + "市";
		for (var i = 0; i < arr.length; i++) {
			var alarm = arr[i];
			if (alarm[0] == location) {
				return alarm;
			}
		}
		return null;
	}
}