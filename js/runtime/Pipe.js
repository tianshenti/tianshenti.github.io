import Sprite from "../base/sprite.js";

// 背景图
export default class Pipe extends Sprite{
    constructor(type=0,img=null,top=0){
        super(type,img,
            0,0,img.width,img.height,
            window.innerWidth,top * Sprite.getDataStore().scaleH,
            img.width * Sprite.getDataStore().scaleW / 2, img.height * Sprite.getDataStore().scaleH);

        this.status = Sprite.getDataStore().STATUS_PIPE_ACTIVE;
        if(type == Sprite.getDataStore().TYPE_UPPIPE){
            this.status = Sprite.getDataStore().STATUS_PIPE_SCORE;
        }
        this.speed = Sprite.getDataStore().PIPE_SPEED;
    }
    drawImage(){
        this.x -= this.speed;
        if(this.x < -this.img.width){
            this.status = Sprite.getDataStore().STATUS_PIPE_DEATH;
        }
        super.drawImage();
    }
}