import Sprite from "../base/Sprite.js";
// 控制按钮 - 开始按钮
export default class StartBtn extends Sprite{
    constructor(){
        const img = Sprite.getImage("startBtn");
        super(Sprite.getDataStore().TYPE_START_BTN, img,
            0,0,img.width,img.height,
            (window.innerWidth - img.width * Sprite.getDataStore().scaleW) / 2,
            (window.innerHeight - img.height * Sprite.getDataStore().scaleH) / 2,
            img.width * Sprite.getDataStore().scaleW,
            img.height * Sprite.getDataStore().scaleH);
    }

}