/**
 * 执行shell命令工具类
 */

module.exports = {
	// 杀死进程
	kill: function kill(process) {
		process.kill('SIGTERM');
		console.log("杀死进程:" + process.pid);
	}
}