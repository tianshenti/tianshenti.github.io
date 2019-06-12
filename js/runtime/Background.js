import Sprite from "../base/sprite.js";

// 背景图
export default class Backgound extends Sprite{
    constructor(){
        const img = Sprite.getImage("background");
        super(0,img,0,0,img.width,img.height,0,0,window.innerWidth,window.innerHeight);
    }
}