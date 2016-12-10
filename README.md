##### 安装
```javascript
npm install --save https://github.com/nobook/nobook-physics-sdk
```
##### 引入需要的js
```html
<script type="text/javascript" src="NBPhysics.js"></script>
```
##### 创建NBPhysics，其他一切操作都要在此基础上完成
```javascript
var nbPhysics = new NBPhysics(function () {
	//初始化完成
	console.log("初始化完成");
});
```
##### 创建auth权限函数
```javascript
var auth = function () {
	// 模拟后端参数生成(appkey不可暴露)
	var appid="123456";
	var time=new Date().getTime();
	var appkey="vwerOkEmJu6tgbToV";
	var code=md5(appid+time+appkey);
	return {appid:appid, time:time, code:code};
}
```
##### 创建实验并获取实验id
```javascript
nbPhysics.createSceneId({
	auth:auth,
	callBack:function (sceneid) {
		console.log("创建实验成果，实验id为:"+sceneid);
	}
});
```
##### 根据实验id进入指定的实验编辑场景,此函数会打开一个新窗口作为编辑窗口
```javascript
nbPhysics.openEditPage({
	auth:auth,
	sceneid:sceneid
});
```
##### 添加播放模块
```javascript
phy = nbPhysics.createPlayer({
	containerId:"mydivId",//实验场景的div的id
	width:500,//实验场景的宽
	height:400,//实验场景的高
	sceneId:"abcdefg",//由createSceneId接口获取的实验id
	auth:auth
});
```
##### 播放模块接口
```javascript
getData()；//返回整个场景json格式的实验数据
setData(json)；//设置整个实验场景的数据
clear()；//清空实验场景
deleteCurrent()；//删除当前选中的器材
getSmallPNG({width,height,quality})；//获取实验场景的当前截图
```