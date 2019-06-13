import Sprite from "../base/sprite.js";

//小鸟的三个动作
const FrameArr = [
    [8,11,31,24],
    [60,11,31,24],
    [113,11,31,24]
];
/** 
 * 小鸟对象,小鸟不参与适配,固定位置 x=30, y=window.innerHeight/2
 */
export default class Bird extends Sprite{
    constructor(){
        const img = Sprite.getImage("birds");
        super(Sprite.getDataStore().TYPE_BIRD, img,
            FrameArr[0][0], FrameArr[0][1], FrameArr[0][2], FrameArr[0][3],
            30, window.innerHeight/2, FrameArr[0][2] * Sprite.getDataStore().scaleW, FrameArr[0][3] * Sprite.getDataStore().scaleH);
        this.niFrame = 0;
        // console.log("bird ---- ",30 + (FrameArr[0][2] * Sprite.getDataStore().scaleW) / 2,window.innerHeight / 2 + (FrameArr[0][3] * Sprite.getDataStore().scaleH) / 2);
        this.speedY = Sprite.getDataStore().BIRD_SPEED_Y;
    }
    drawImage(){
        ++this.niFrame;
        if(this.niFrame >= 3){
            this.niFrame = 0;
        }
        if(this.speedY < 2){
            this.speedY += 1;
            console.log("************* ",this.y, this.speedY);
        }
        this.y += this.speedY;
        this.imgX = FrameArr[this.niFrame][0];
        super.drawImage();
    }
}