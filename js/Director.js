import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

// 导演类，控制游戏的逻辑，主流程
export class Director{
  constructor(){
    this.dataStore = DataStore.getInstance();
    // this.flag = true; // 可以加分
  }

  // 单例，所有人获取到的都是同一个Director
  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }

  // 创建水管
  createPipes(){
    // 设置top的最大值与最小值
    const minTop = this.dataStore.canvas.height/6;
    const maxTop = this.dataStore.canvas.height/2;
    const top = Math.random()*(maxTop-minTop) + minTop;
    // 创建水管
    const up = new UpPipe(top);
    const down = new DownPipe(top);
    // 将创建的水管存入pipes数组中
    this.dataStore.get('pipes').push(up);
    this.dataStore.get('pipes').push(down);
  }

  // 小鸟事件
  birdsEvent(){
    // 单击时，将小鸟自由落体的时间重置为0 
    // this.dataStore.get('birds').y -= 30;
    this.dataStore.get('birds').time = 0;
  }

  // 判断小鸟与某一个水管是否撞击
  isStrick(bird,pipe){
    let s = true; // 撞了
    if(
      bird.right <= pipe.left || 
      bird.left >= pipe.right ||
      bird.bottom <= pipe.top ||
      bird.top >= pipe.bottom
      ){
      // 没撞
      s = false;
    }
    return s;
  }

  // 检查小鸟与水管、地板、天花板的撞击情况
  check(){
    // 获取小鸟、水管、地板
    const land = this.dataStore.get('land');
    const birds = this.dataStore.get('birds');
    const pipes = this.dataStore.get('pipes');
    const score = this.dataStore.get('score');
    // console.log(birds);
    // 小鸟撞到了地板或者天花板，游戏结束
    if(birds.y<0 || birds.y+birds.height>=land.y){
      this.isGameOver = true;
      return ;
    }

    // 判断小鸟与水管的撞击情况
    // 构建小鸟的边框模型
    const birdsBorder = {
      top : birds.y,
      bottom : birds.y + birds.height,
      left : birds.x,
      right : birds.x + birds.width
    };
    // 构建水管的边框模型(水管有多个，遍历，给每一个水管构建一个模型)
    for(let i=0;i<pipes.length;i++){
      const pipe = pipes[i];
      // 构建水管的边框模型
      const pipeBorder = {
        top : pipe.y,
        bottom : pipe.y + pipe.height,
        left : pipe.x,
        right : pipe.x + pipe.width
      }
      // 判断有没有跟小鸟的边框模型撞击
      if(this.isStrick(birdsBorder,pipeBorder)){
        // 撞上了，游戏结束
        this.isGameOver = true;
        return ;
      }
      // 判断是否加分
      if(birds.x>pipeBorder.right && score.flag /* this.flag */){
        score.scoreNumber++ ;
        // 关闭加分开关
        score.flag = false;
        // this.flag = false;
      }
    }
    


  }

  // 执行方法
  run(){
    // 调用check方法，判断游戏有没有结束
    this.check();
    // 根据判断得到的isGameOver来决定游戏是否结束
    if(!this.isGameOver){
      // 获取背景图
      this.dataStore.get('background').draw();
      
      // 获取所有水管的数组
      const pipes = this.dataStore.get('pipes');
      // 删除出界的一组水管
      if(pipes[0].x+pipes[0].width<0 && pipes.length==4){
        pipes.shift();
        pipes.shift();
        // 打开加分开关
        this.dataStore.get('score').flag = true;
        // this.flag = true;
      }

      // 创建水管
      const width = this.dataStore.canvas.width/2;
      if(pipes[0].x <= width-pipes[0].width && pipes.length==2){
        this.createPipes();
      }

      for(let i=0;i<pipes.length;i++){
        pipes[i].draw();
      }

      this.dataStore.get('birds').draw();
      this.dataStore.get('score').draw();
      this.dataStore.get('land').draw();
      // 定时器，让run不停的运行
      // setTimeout(()=>this.run(),10);
      this.time = requestAnimationFrame(()=>this.run());
      // 清除time
      // cancelAnimationFrame(time);
    }else{
      // 游戏已经结束了，不需要渲染
      cancelAnimationFrame(this.time);
      this.dataStore.get('background').draw();
      const pipes = this.dataStore.get('pipes');
      for (let i = 0; i < pipes.length; i++) {
        pipes[i].draw();
      }
      this.dataStore.get('land').draw();
      this.dataStore.get('birds').draw();
      this.dataStore.get('score').draw();

      // 画重新开始的箭头
      this.dataStore.get('startButton').draw();
      // 清空变量池中的数据(通过put保存的数据)
      this.dataStore.destroy();
    }
  }
}









