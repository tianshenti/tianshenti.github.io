import Sprite from "../base/sprite.js";
import DataStore from "../base/dataStore.js";
const PIPE_SPEED = 2;
const PIPE_ACTIVE = 1;
const PIPE_DEATH = 2;

// 背景图
export default class Pipe extends Sprite{
    constructor(type=0,img=null,top=0){
        let dataStore = DataStore.getInstance();
        super(type,img,
            0,0,img.width,img.height,
            window.innerWidth,top * dataStore.scaleH,img.width/2,img.height * dataStore.scaleH);
            // window.innerWidth,top,img.width/2,img.height);
        this.status = PIPE_ACTIVE;
    }
    drawImage(){
        this.x -= PIPE_SPEED;
        if(this.x < -this.img.width){
            this.status = PIPE_DEATH;
        }
        super.drawImage();
    }
}