# Voice-Pi

使用Node.js开发的运行在Raspberry Pi上的语音助手.
* 使用request.js实现网络请求
* 使用cheerio.js实现HTML解析
* 使用later.js实现定时任务


## 配置

1. 执行`npm install --save`安装依赖项
2. 在项目根目录新建`conf`目录, 在其中创建`conf.json`文件, 并填写配置信息. 示例:

```json
{
	"car":{
		"carNumber":"冀A888888"
	},
	"location":{
		"province":"河北",
		"city":"石家庄"
	},
	"radio":{
		"morningRadio":"河北交通广播",
		"noonRadio1":"中央广播电台经济之声",
		"noonRadio2":"河北交通广播"
	},
	"music":{
		"morningMusic":"./resources/music/a.mp3",
		"noonMusic":"./resources/music/b.mp3",
		"eveningMusic":"./resources/music/c.mp3",
		"nightMusic":"./resources/music/d.mp3"
	}
}
```

## 版本历史

* 0.1.0
	- 通过网络获取天气, 限行信息
	- 播放本地音乐
	- 通过百度TTS实现语音合成