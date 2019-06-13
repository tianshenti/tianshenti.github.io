import Sprite from "../base/Sprite.js";

const TYPE_BACKGROUND= 1;
// 背景图
export default class Background extends Sprite{
    constructor(){
        const img = Sprite.getImage("background");
        // super(0,img,0,0,img.width,img.height,0,0,img.width,img.height);
        super(TYPE_BACKGROUND,img,0,0,img.width,img.height,0,0,window.innerWidth,window.innerHeight);
    }
}