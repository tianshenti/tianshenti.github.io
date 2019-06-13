import Pipe from "./Pipe.js";
const UP_PIPE = 1;
// 背景图
export default class UpPipe extends Pipe{
    constructor(){
        const img = Sprite.getImage("pie_up");
        super(UP_PIPE,img,0,0,img.width,img.height,0,0,img.width,img.height);
    }
}