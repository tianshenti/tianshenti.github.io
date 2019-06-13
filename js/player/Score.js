import Sprite from "../base/Sprite.js";
// 积分 
export default class Score extends Sprite{
    constructor(){
        super(Sprite.getDataStore().TYPE_SCORE, null, 0, 0, 0, 0,
            50 * Sprite.getDataStore().scaleW, 25 * Sprite.getDataStore().scaleH,
            0, 0);
    }

}