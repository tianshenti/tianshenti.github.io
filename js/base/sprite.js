import DataStore from "./dataStore.js";


/**
 *
 *所有图片的父类,任何适配都不许在这里了做
 *
 */
export default class Sprite{
	constructor(type=0,img=null,imgX=0,imgY=0,imgW=0,imgH=0,x=0,y=0,w=0,h=0){
		this.dataStore = DataStore.getInstance();
		//角色的类型
		this.type = type;
		//角色的图片
		this.img = img;
		//截取图片部分区域的起始点(imgX,imgY)
		this.imgX = imgX;
		this.imgY = imgY;
		//截取图片部分区域的宽高(imgW,imgH)
		this.imgW = imgW;
		this.imgH = imgH;
		//角色的左上点(x,y)
		this.x = x;
		this.y = y;
		//角色的宽width, 高height
		this.width = w;
		this.height = h;
		//角色的碰撞中心点
		this.centerX = x + w/2;
		this.centerY = y + h/2;
		//角色的碰撞距离, 宽width, 高height
		this.checkW = (w - 8) / 2;
		this.checkH = (h - 8) / 2;
		switch(type){
			case 1 :
			case 2 :
				break;
			case 3 :
					this.index = ++DataStore.getInstance().index;
					// console.log(" ---- ",DataStore.getInstance().index)
					break;
			case 4 :
				// console.log("水管 : ", x + imgW/2, y + imgH/2);
				break;
			case 5 :
				console.log("小鸟 : ", x + w/2," , ", y + h/2 ," | ", this.centerX," , ", this.centerY);
				break;
		}
		
	}
	/**
	 * 图片绘制的锚点 : 左上点
	 * 实际的锚点 : 左上点
	 */
	drawImage(img=this.img,
			imgX=this.imgX,imgY=this.imgY,imgW=this.imgW,imgH=this.imgH,
			x=this.x,y=this.y,w=this.width,h=this.height){
		//绘制灰色的透明背景
		if(this.type == this.dataStore.TYPE_START_BTN){
			this.dataStore.ctx.fillStyle = "rgba(0,0,0,0.5)";
			this.dataStore.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

			this.dataStore.ctx.fillStyle = "rgba(255,0,0,1)";
			this.dataStore.ctx.font = "20px consolas";
			this.dataStore.ctx.textAlign ="center";
			this.dataStore.ctx.fillText("积分:"+ this.dataStore.get("score"),window.innerWidth / 2,window.innerHeight / 2 - 100);
		}
		//绘制图片
		this.dataStore.ctx.drawImage(img,imgX,imgY,imgW,imgH,x,y,w,h);
		//角色的中心点
		this.centerX = x + w/2;
		this.centerY = y + h/2;
		
		//绘制碰撞框
		if(this.type >=3){
			this.dataStore.ctx.strokeStyle = "red";
			// this.dataStore.ctx.strokeRect(x + 4,y + 4,w - 8,h - 8);
			this.dataStore.ctx.strokeRect(x + 4,y + 4,this.checkW * 2,this.checkH * 2);
		}
		if(this.type == 3){
			this.dataStore.ctx.fillStyle = "black";
			this.dataStore.ctx.font = "20px consolas";
			this.dataStore.ctx.textAlign = "center";
			this.dataStore.ctx.fillText("" + this.index,this.centerX,this.centerY);
		}
	}
	//获取指定名称的图片
	static getImage(key){
		return DataStore.getInstance().res.get(key);
	}
	static getDataStore(key){
		return DataStore.getInstance();
	}
}