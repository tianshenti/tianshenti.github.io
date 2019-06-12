//变量池, 游戏过程中的数据保存和销毁
export default class DataStore{
    constructor(){
        this.map = new Map();
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
        this.map.set(key.value);
        //返回变量池,方便链式调用
        return this;
    }
    //获取数据
    get(key){
        return this.map.get(key);
    }
    //销毁数据
    distroy(){
        for(let value of this.map.values()){
            value = null;
        }
    }
}