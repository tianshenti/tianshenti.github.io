//
const SCREEN_W = 375;
const SCREEN_H = 667;


//变量池, 游戏过程中的数据保存和销毁
export default class DataStore{
    constructor(){
        this.mapThis = new Map();
        // this.array = [];
        this.scaleW = window.innerWidth / SCREEN_W;
        this.scaleH = window.innerHeight / SCREEN_H;
        console.log("scale : ", this.scaleW,this.scaleH);
        //地板的移动速度
        this.LAND_SPEED = 1;
        //类型
        this.TYPE_BACKGROUND= 1;
        this.TYPE_LAND = 2;
        this.TYPE_UPPIPE = 3;
        this.TYPE_DOWNPIPE = 4;
        this.TYPE_BIRD = 5;
        this.TYPE_START_BTN = 6;
        //水管的移动速度
        this.PIPE_SPEED = 2;
        //水管的状态
        this.STATUS_PIPE_SCORE = 1;
        this.STATUS_PIPE_ACTIVE = 2;
        this.STATUS_PIPE_DEATH = 3;
        //上下两个水管之间的默认距离 -- 用于下水管的生成
        this.PIPE_DISTANCE_X = 135;
        //左右两个水管之间的默认距离 -- 用于右水管的生成
        this.PIPE_DISTANCE_Y = 80;
        //记录
        this.index = 0;
        //用于判断游戏是否结束
        this.GameOver = false;
    }
    // 只能创建一个实例对象 : 单例
    // static修饰的方法,可以直接用类名调用
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    //销毁数据
    distroy(){
        this.mapThis.clear();
        console.log("distroy  - ",this.mapThis);
    }
    //存储数据
    set(key,value){
        this.mapThis.set(key,value);
        //返回变量池,方便链式调用
        return this;
    }
    //获取数据
    get(key){
        return this.mapThis.get(key);
    }
}