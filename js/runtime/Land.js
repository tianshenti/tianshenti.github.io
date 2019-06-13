import Sprite from "../base/Sprite.js";

// 背景图
export default class Land extends Sprite{
    constructor(){
        const img = Sprite.getImage("land");
        super(0,img,0,0,img.width,img.height,0,window.innerHeight - img.height,img.width,img.height);
    }
}