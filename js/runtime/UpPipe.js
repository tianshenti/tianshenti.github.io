import Pipe from "./Pipe.js";
import Sprite from "../base/sprite.js";
const TYPE_UPPIPE = 3;
// 背景图
export default class UpPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage("pipeUp");
        super(TYPE_UPPIPE,img,-top);
    }
}