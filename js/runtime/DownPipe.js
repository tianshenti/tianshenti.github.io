import Pipe from "./Pipe.js";
import Sprite from "../base/sprite.js";
const TYPE_DOWNPIPE = 4;
// 背景图
export default class DownPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage("pipeDown");
        const land = Sprite.getImage("land");
        super(TYPE_DOWNPIPE,img,img.height + 135 - top);
        console.log(img.height, top);
    }
}