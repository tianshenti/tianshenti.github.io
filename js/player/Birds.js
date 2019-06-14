import Sprite from "../base/Sprite.js";

//小鸟的三个动作
const FrameArr = [
    [8,11,31,24],
    [8,11,31,24],
    [8,11,31,24],
    // [60,11,31,24],
    // [60,11,31,24],
    [60,11,31,24],
    [113,11,31,24],
    [113,11,31,24],
    [113,11,31,24]
];
/** 
 * 小鸟对象,小鸟不参与适配,固定位置 x=30, y=window.innerHeight/2
 */
export default class Bird extends Sprite{
    constructor(){
        const img = Sprite.getImage("birds");

        const land = Sprite.getDataStore().get("land");

        super(Sprite.getDataStore().TYPE_BIRD, img,
            FrameArr[0][0], FrameArr[0][1], FrameArr[0][2], FrameArr[0][3],
            30 * Sprite.getDataStore().scaleW,
            window.innerHeight / 2 - land.height,
            FrameArr[0][2] * Sprite.getDataStore().scaleW,
            FrameArr[0][3] * Sprite.getDataStore().scaleH);
        this.niFrame = 0;
        // console.log("bird ---- ",30 + (FrameArr[0][2] * Sprite.getDataStore().scaleW) / 2,window.innerHeight / 2 + (FrameArr[0][3] * Sprite.getDataStore().scaleH) / 2);
        this.speedY = Sprite.getDataStore().BIRD_SPEED_Y;
    }
    drawImage(){
        ++this.niFrame;
        if(this.niFrame >= FrameArr.length){
            this.niFrame = 0;
        }
        if(this.speed < -7) {
          this.speedY += 0.5
        }else if(this.speed < -3){
          this.speedY += 0.8;
        }else if (this.speed < 0) {
          this.speedY += 1
        }else if(this.speedY < 5){
            this.speedY += 1;
            // console.log("************* ",this.y, this.speedY);
        }
        this.y += this.speedY;
        this.imgX = FrameArr[this.niFrame][0];
        super.drawImage();
    }
}