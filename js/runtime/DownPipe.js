import Sprite from "../base/sprite.js";

// 背景图
export default class DownPipe extends Sprite{
    constructor(){
        const img = Sprite.getImage("pie_down");
        super(0,img,0,0,img.width,img.height,0,0,img.width,img.height);
    }
}