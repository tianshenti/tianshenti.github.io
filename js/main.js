//程序主类
import Loading from "./base/loading.js";
import DataStore from "./base/dataStore.js";
import Land from "./runtime/Land.js";
import Background from "./runtime/Background.js";
import Director from "./Director.js";
export default class Main {
	constructor(){
		console.log("Game Start!");
		//
		this.canvas = document.querySelector('#canvas');
		this.ctx = this.canvas.getContext('2d');
		this.screenW = window.innerWidth;
		this.screenH = window.innerHeight;
		this.canvas.width = this.screenW;
		this.canvas.height = this.screenH;
		this.canvas.style.background = "pink";
		//获取变量池
		this.dataStore = DataStore.getInstance();
		//获取导演
		this.director = Director.getInstance();
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
		//创建游戏过程中的使用到的对象,并将其put到变量池中
		this.dataStore.set("background",new Background())
					  .set("land",new Land());
		this.director.run();
	}
	

}