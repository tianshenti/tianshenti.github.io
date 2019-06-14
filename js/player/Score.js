import Sprite from "../base/Sprite.js";
// 积分 
export default class Score extends Sprite{
    constructor(){
        super(Sprite.getDataStore().TYPE_SCORE, null, 0, 0, 0, 0,
            20 * Sprite.getDataStore().scaleW, 30 * Sprite.getDataStore().scaleH,
            0, 0);
    }

}