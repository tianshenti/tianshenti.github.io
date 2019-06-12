//程序主类
import Sprite from "./base/sprite.js";
import Loading from "./base/loading.js";
import DataStore from "./base/dataStore.js";
import BackGround from "./runtime/background.js";
import Backgound from "./runtime/background.js";
export default class Main {
	constructor(){
		console.log("Game Start!");
		//
		this.canvas = document.querySelector('#canvas');
		this.ctx = this.canvas.getContext('2d');
		this.screenW = window.innerWidth;
		this.screenH = window.innerHeight;
		//获取变量池
		this.dataStore = DataStore.getInstance();
		// 获取资源加载器
		this.loader = new Loading();
		this.loader.onloaded(this.onResourceLoaded);
	}
	//资源图片加载成功
	onResourceLoaded = map => {
		// 这三个数据永久保存
		this.dataStore.canvas = this.canvas;
		this.dataStore.ctx = this.ctx;
		this.dataStore.res = map;
		console.log("aaaaa",this.dataStore.res);
		// console.log("ccc",this.screenW,this.screenH);
		// this.ctx.drawImage(map.get("background"),0,0);
		this.init();
	}
	//数据的初始化
	init(){
		new Backgound().drawImage();
	}
	

}