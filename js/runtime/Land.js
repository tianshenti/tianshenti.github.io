import Sprite from "../base/Sprite.js";
import DataStore from "../base/dataStore.js";
//地板的移动速度
const LAND_SPEED = 1;
const TYPE_LAND = 2;
// 背景图
export default class Land extends Sprite{
    constructor(){
        const img = Sprite.getImage("land");
        let dataStore = DataStore.getInstance();
        // super(TYPE_LAND,img,0,0,img.width,img.height,0,window.innerHeight - img.height,img.width,img.height);
        super(TYPE_LAND,img,0,0,img.width,img.height,0,window.innerHeight - img.height,window.innerWidth,img.height * dataStore.scaleH);
        this.speed = LAND_SPEED;
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