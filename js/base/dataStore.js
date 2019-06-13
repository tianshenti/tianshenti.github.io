//
const SCREEN_W = 375;
const SCREEN_H = 667;

//变量池, 游戏过程中的数据保存和销毁
export default class DataStore{
    constructor(){
        this.mapThis = new Map();
        this.array = [];
        this.scaleH = window.innerHeight / SCREEN_H;
		this.scaleW = window.innerWidth / SCREEN_W;
    }
    // 只能创建一个实例对象 : 单例
    // static修饰的方法,可以直接用类名调用
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
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
    //存储Pipe水管
    getArray(){
        return this.array;
    }
    //销毁数据
    distroy(){
        for(let value of this.mapThis.values()){
            value = null;
        }
        for(let i=0;i<this.array.length;i++){
            this.array[i] = null;
        }
        this.array = null;
    }
}