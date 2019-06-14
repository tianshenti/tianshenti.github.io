import Sprite from "../base/Sprite.js";
// 控制按钮 - 开始按钮
export default class StartBtn extends Sprite{
    constructor(){
        const img = Sprite.getImage("startBtn");
        let scale = Math.max(Sprite.getDataStore().scaleW,Sprite.getDataStore().scaleH);
        super(Sprite.getDataStore().TYPE_START_BTN, img,
            0,0,img.width,img.height,
            (window.innerWidth - img.width * scale) / 2,
            (window.innerHeight - img.height * scale) / 2,
            img.width * scale,
            img.height * scale);
    }

}