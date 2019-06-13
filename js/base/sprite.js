import DataStore from "./dataStore.js";

//所有图片的父类
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
		//角色的中心点
		this.centerX = this.x + this.w/2;
		this.centerY = this.y - this.h/2;
	}
	/**
	 * 图片绘制的锚点 : 左上点
	 * 实际的锚点 : 左上点
	 */
	drawImage(img=this.img,
			imgX=this.imgX,imgY=this.imgY,imgW=this.imgW,imgH=this.imgH,
			x=this.x,y=this.y,w=this.width,h=this.height){
		//绘制图片
		this.dataStore.ctx.drawImage(img,imgX,imgY,imgW,imgH,x,y,w,h);
		//绘制碰撞框
		if(this.type >=3){
			this.dataStore.ctx.strokeStyle = "red";
			this.dataStore.ctx.strokeRect(x,y,w,h);
		}
	}
	//获取指定名称的图片

	static getImage(key){
		return DataStore.getInstance().res.get(key);
	}
}