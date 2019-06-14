import { Resources } from "./Resources.js";

// 资源加载器，保证程序在图片全部加载完成后再开始渲染
export class ResourceLoader{
  constructor(){
    // 获取所有的资源Resources
    this.map = new Map(Resources);
    // console.log(this.map);
    // 遍历map，将其中的字符串路径替换为img对象
    for(let [k,v] of this.map){
      // const img = new Image();
      const img = wx.createImage();
      img.src = v;
      // 将图片替换原来的字符串
      // map.set(key,val) 设置map的key-val值
      this.map.set(k,img);
    }
    // console.log(this.map);
  }

  onloaded(callback){
    let count = 0;//计数器
    // map.values() 获取map中所有的值
    for(let v of this.map.values()){
      v.onload = ()=>{
        count++;
        // 判断图片还有没有没加载完成的
        // map.size map集合的长度
        if(count>=this.map.size){
          // 所有图片加载成功
          callback(this.map);
        }
      }
    }
  }


}


