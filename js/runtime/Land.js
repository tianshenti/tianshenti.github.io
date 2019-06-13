import Sprite from "../base/Sprite.js";
// 背景图
export default class Land extends Sprite{
    constructor(){
        const img = Sprite.getImage("land");
        super(Sprite.getDataStore().TYPE_LAND,img,
            0,0,img.width,img.height,
            0,window.innerHeight - img.height * Sprite.getDataStore().scaleH,
            window.innerWidth,img.height * Sprite.getDataStore().scaleH);
        this.speed = Sprite.getDataStore().LAND_SPEED;
    }
    drawImage(moveX=0){
        if(this.x + moveX < -window.innerWidth){
            this.x = 0;
        }
        this.x -= this.speed;
        //重写父类的drawImage()方法
        super.drawImage(this.img,this.imgX,this.imgY,this.imgW,this.imgH,
			this.x + moveX,this.y,this.width,this.height);
    }
}