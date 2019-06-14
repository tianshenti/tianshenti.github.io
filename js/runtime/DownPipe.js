import Pipe from "./Pipe.js";
import Sprite from "../base/Sprite.js";

// 背景图
export default class DownPipe extends Pipe{
    constructor(top){
        const img = Sprite.getImage("pipeDown");
        super(Sprite.getDataStore().TYPE_DOWNPIPE, img, img.height + Sprite.getDataStore().PIPE_DISTANCE_X - top);
        // console.log(img.height, top);
    }
}