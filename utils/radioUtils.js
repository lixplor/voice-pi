/**
 * 广播工具类
 */
var later = require("later");
var radioList = require("../resources/radioList");
var shellUtils = require("../utils/shellUtils");
var childProcess = require("child_process");

module.exports = {
	// 根据广播名称查找URL
	getRadioByTitle: function getUrlByTitle(title) {
		for (var i = 0; i < radioList.length; i++) {
			var radio = radioList[i];
			if (radio.title.indexOf(title) >= 0) {
				return radio;
			}
		}
		return null;
	},
	// 播放指定时间的广播
	play: function play(radio, minute) {
		var child = childProcess.spawn('mplayer', ['-ao', 'alsa:device=hw=0.0', radio.url]);
		console.log("开始播放"+radio.title+", 进程:" + child.pid);
		var killTask = later.parse.recur().every(minute).minute();
		later.setTimeout(
			function(){
				shellUtils.kill(child);
			}, 
			killTask
		);
	} 
}