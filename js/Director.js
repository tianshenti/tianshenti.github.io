import DataStore from "./base/dataStore.js";
import UpPipe from "./runtime/UpPipe.js";
import DownPipe from "./runtime/DownPipe.js";

//导演类,控制游的逻辑,主流程

export default class Director{

    constructor(){
        this.dataStore = DataStore.getInstance();
        //用于控制pipe生成的间隔
        this.pipeDistance = 0;
    }
    static getInstance(){
        if(!Director.director){
            Director.director = new Director();
        }
        return Director.director;
    }
    
    // 执行方法
    run(){
        // console.log(this.dataStore.get("land").width);
        this.dataStore.get("background").drawImage();
        //水管pipe
        this.pipe();
        //地板需要站挡住下水管pipe
        this.dataStore.get("land").drawImage();
        this.dataStore.get("land").drawImage(this.dataStore.get("land").width);

        //定时器,让run()不停的运行
        // setTimeout(() => this.run(),50);
        let time = requestAnimationFrame(() => this.run());
        // cancelAnimationFrame(time); // 清楚定时器
    }
    
    //水管Pipe
    pipe(){
        let array = this.dataStore.getArray();
        if(this.pipeDistance == 0){
            //水管pipe的偏移量
            let moveY = (parseInt(Math.random() * 10) + 5) * 25;
            //两根水管之间的距离 --- 默认值是135
            let distanceY = (parseInt(Math.random() * 5) + 2) * 10;
            let upPipe = new UpPipe(moveY/2);
            let downPipe = new DownPipe(moveY/2 + distanceY);
            array[array.length] = upPipe;
            array[array.length] = downPipe;
            // console.log(this.dataStore.scaleH,"  :  ", 135 * this.dataStore.scaleH);
            // console.log("moveY : ",moveY," : distanceY : ",distanceY," : 两根水管之间的距离 : ",(upPipe.y + upPipe.height - downPipe.y)," ; length : ",array.length );
        }
        this.pipeDistance++;
        if(this.pipeDistance == 80){
            this.pipeDistance = 0;
        }
        for(let i = array.length - 1;i>=0;i--){
            if(array[i].status == 2){
                array[i] = null;
                array.splice(i,1);
                // array.shift();
                continue;
            }
            array[i].drawImage();
        }
    }
}