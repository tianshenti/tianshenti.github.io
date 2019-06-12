//资源加载器,保证资源加载完成后程序才开始渲染
import {Resource} from "./Resource.js";
export default class Loading{
    constructor(){
        //获取所有的资源
        this.map = new Map(Resource);
        for(let [k,v] of this.map){
            const img = new Image();
            img.src = v;
            this.map.set(k,img);
        }
        console.log(this.map);
    }
    onloaded(callback){
        let count = 0;//计数器
        // map.value() 获取map中所有的值
        for(let v of this.map.values()){
            v.onload = ()=>{
                count++;
                //判断图片是否加载完成
                //map.size : map集合的长度
                if(count >= this.map.size){
                    console.log("所有图片加载成功");
                    //所有图片加载成功
                    callback(this.map);
                }
            }
        }
    }
}