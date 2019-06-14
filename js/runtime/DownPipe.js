import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 下半部的水管

export class DownPipe extends Pipe{
  constructor(top){
    const img = Sprite.getImage('pieDown');
    super(img,top);
  }

  draw(){
    // 上下水管中间的间距
    const gap = DataStore.getInstance().canvas.height/4;
    this.y = gap + this.top;
    super.draw();
  }

}


