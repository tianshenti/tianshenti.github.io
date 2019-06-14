import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Land extends Sprite{
  constructor(){
    // 获取land图片
    const img = Sprite.getImage('land');
    // 获取canvas的宽高
    const height = DataStore.getInstance().canvas.height;
    // 地板起点y坐标
    const y = height-img.height;
    super(img,0,0,img.width,img.height,0,y,img.width,img.height);
    this.speed = 2;// 地板向左移动的速度

  }

  draw(){
    // 将x的值进行改变(移动)
    this.x = this.x - this.speed;
    if(this.x<=-this.srcW+DataStore.getInstance().canvas.width){
      this.x = 0;
    }
    // 重写父类的draw方法
    // super.draw(this.img,this.srcX,this.srcY,this.srcW,this.srcH,this.x,this.y,this.width,this.height);
    // 因为上面传入的参数与默认值一样，所以不传参数，使用默认值
    super.draw();
  }


}





