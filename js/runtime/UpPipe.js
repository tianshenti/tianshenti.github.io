import Pipe from "./Pipe.js";
import Sprite from "../base/sprite.js";
// 背景图
export default class UpPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage("pipeUp");
        super(Sprite.getDataStore().TYPE_UPPIPE, img, -top);
    }
}