/**
 * mplayer工具类
 */
var shell = require("shelljs");



module.exports = {
	// TTS合成
	speak: function speak(text) {
		var ttsUrl = "http://tts.baidu.com/text2audio?idx=1&tex="+text+"&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=4&per=0&vol=5&pit=5";
		shell.exec('mplayer -ao alsa:device=hw=0.0 "' + ttsUrl + '"');
	},
	// 播放网络或本地文件
	play: function play(url) {
		shell.exec('mplayer -ao alsa:device=hw=0.0 "' + url + '"');
	}
}