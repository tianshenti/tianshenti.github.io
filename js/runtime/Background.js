import Sprite from "../base/Sprite.js";

// 背景图
export default class Background extends Sprite{
    constructor(){
        const img = Sprite.getImage("background");
        super(0,img,0,0,img.width,img.height,0,0,img.width,img.height);
    }
}