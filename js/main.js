//程序主类
import Loading from "./base/loading.js";
import DataStore from "./base/dataStore.js";
import Director from "./Director.js";
import Land from "./runtime/Land.js";
import Background from "./runtime/Background.js";
import Bird from "./player/Birds.js";

export default class Main {
	constructor(){
		console.log("Game Start!");
		//
		this.canvas = document.querySelector('#canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width =  window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style.background = "pink";
		//获取变量池
		this.dataStore = DataStore.getInstance();
		//获取导演
		this.director = null;
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
		//////////////////////////////////////
		//获取导演
		this.director = Director.getInstance();
		this.init();
	}
	//数据的初始化
	init(){	
		this.director.run();
	}
	

}