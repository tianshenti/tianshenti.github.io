import DataStore from "./base/dataStore.js";

//导演类,控制游的逻辑,主流程

export default class Director{

    constructor(){
        this.dataStore = DataStore.getInstance();
    }
    static getInstance(){
        if(!Director.director){
            Director.director = new Director();
        }
        return Director.director;
    }
    // 执行方法
    run(){
        console.log(this.dataStore.get("background"));
        this.dataStore.get("background").drawImage();
        this.dataStore.get("land").drawImage();
    }
}