import DataStore from "./base/dataStore.js";
import UpPipe from "./runtime/UpPipe.js";
import DownPipe from "./runtime/DownPipe.js";
import StartBtn from "./player/StartButton.js";
import Land from "./runtime/Land.js";
import Background from "./runtime/Background.js";
import Bird from "./player/Birds.js";
import Score from "./player/Score.js";

//导演类,控制游的逻辑,主流程

export default class Director{
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.init();
    }
    static getInstance(){
        if(!Director.director){
            Director.director = new Director();
        }
        return Director.director;
    }
    init(){
        //用于控制pipe生成的间隔
        this.pipeDistance = 0;
        //逻辑计时器
        this.time = null;
        //创建游戏过程中的使用到的对象,并将其put到变量池中
		this.dataStore.set("scoreNum",0)
                        .set("background",new Background())
                        .set("land",new Land())
                        .set("pipe",[])
                        .set("bird",new Bird())
                        .set("score",new Score());
                    //   .set("startBtn",new StartBtn());
        console.log("GameOver : ",this.dataStore.GameOver)
        this.dataStore.canvas.addEventListener("touchstart",this.onTouchStart);
        // this.dataStore.canvas.addEventListener("touchmove",this.touchUp);
        this.dataStore.canvas.addEventListener("touchend",this.onTouchEnd);
    }
    
    onTouchStart = e => {
        // console.log("touchend : ",e);
        this.dataStore.get("bird").speedY = -10;
    }
    onTouchEnd = e => {
        // console.log("touchend : ",e);
    }
    gameStart = e => {
        // console.log("gameStart",e);
        if(e.offsetX > this.dataStore.get("startBtn").x && 
            e.offsetX < this.dataStore.get("startBtn").x + this.dataStore.get("startBtn").width &&
            e.offsetY > this.dataStore.get("startBtn").y &&
            e.offsetY < this.dataStore.get("startBtn").y + this.dataStore.get("startBtn").height){
                this.dataStore.distroy();
                this.dataStore.GameOver = false;
                this.dataStore.index = 0;
                this.init();
                this.dataStore.canvas.removeEventListener("click",this.gameStart);
                this.run();
            }
    }
    gameEnd(){
        this.dataStore.GameOver = true;
                this.dataStore.set("startBtn",new StartBtn());
                this.dataStore.canvas.addEventListener("click",this.gameStart);
                this.dataStore.canvas.removeEventListener("touchstart",this.onTouchStart);
                this.dataStore.canvas.removeEventListener("touchend",this.onTouchEnd);
    }
    // 执行方法
    run(){
		if(this.dataStore.GameOver){
            this.dataStore.get("startBtn").drawImage();
            return ;
        }
        //背景图
        this.dataStore.get("background").drawImage();
        //水管pipe
        this.pipe();
        //地板需要站挡住下水管pipe
        this.dataStore.get("land").drawImage();
        this.dataStore.get("land").drawImage(this.dataStore.get("land").width);
        //小鸟
        this.bird();
        //积分
        this.dataStore.get("score").drawImage();
        //定时器,让run()不停的运行
        this.time  = requestAnimationFrame(() => this.run());
        // cancelAnimationFrame(time); // 清楚定时器
    }
    // 小鸟
    bird(){
        //小鸟
        this.dataStore.get("bird").drawImage();
        let land = this.dataStore.get("land");
        let bird = this.dataStore.get("bird");
        // 小鸟与水管的碰撞放在pipe()方法里
        // 小鸟与地面碰撞
        let birdY = bird.centerY + bird.checkH;
        let landY = land.centerY - land.checkH;
        //碰撞检测
        if(landY <= birdY){
            console.log("bird() ----- birdY : ", birdY," , landY : ", landY);
            this.gameEnd();
        }
    }
    //水管Pipe
    pipe(){
        let array = this.dataStore.get("pipe");
        let bird = this.dataStore.get("bird");
        if(this.pipeDistance == 0){
            //水管pipe的偏移量
            let moveY = (parseInt(Math.random() * 20) + 5) * 30;
            // let moveY = 600;
            //两根水管之间的距离 --- 默认值是135
            let distanceY = (parseInt(Math.random() * 5) + 2) * 10;
            let upPipe = new UpPipe(moveY/2);
            let downPipe = new DownPipe(moveY/2 + distanceY);
            array[array.length] = upPipe;
            array[array.length] = downPipe;
            // console.log(this.dataStore.scaleH,"  :  ", 135 * this.dataStore.scaleH);
            // console.log("moveY : ",moveY,"; distanceY : ",distanceY,"; 上水管 : ",upPipe.y,"; 下水管 : ",downPipe.y,"; 水管之间的距离 : ",(upPipe.y + upPipe.height - downPipe.y),"; length : ",array.length );
        }
        this.pipeDistance++;
        if(this.pipeDistance >= this.dataStore.PIPE_DISTANCE_Y * this.dataStore.scaleW){
            this.pipeDistance = 0;
        }
        for(let i = array.length - 1;i>=0;i--){
            let x = array[i].centerX - bird.centerX;
            let y = array[i].centerY - bird.centerY;
            let w = array[i].checkW + bird.checkW;
            let h = array[i].checkH + bird.checkH;
            //碰撞检测
            if(Math.abs(x) <= w && Math.abs(y) <= h){
                // console.log("check ----- x : ",x," , y : ", y," | w : ",w," , h : ",h);
                this.gameEnd();
            }
            //积分
            if(array[i].status == this.dataStore.STATUS_PIPE_SCORE && x <= 0){
                array[i].status = this.dataStore.STATUS_PIPE_ACTIVE;
                this.dataStore.set("scoreNum",this.dataStore.get("scoreNum") + 1);
                // console.log("x : ",x,"; i : ",i,"; score : ",this.dataStore.get("scoreNum"));
            }
            //死亡处理
            if(array[i].status == this.dataStore.STATUS_PIPE_DEATH){
                array[i] = null;
                array.splice(i,1);
                continue;
            }
            array[i].drawImage();
        }
    }
}