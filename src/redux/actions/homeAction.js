// 定义action中的type常量，方便后期统一管理
export const INIT_MAINDATAS = 'INIT_MAINDATAS';
export const ADD_TO_RECOMDATAS = 'ADD_TO_RECOMDATAS';
export const CLEAR_RECOMDATAS_LIST = 'CLEAR_RECOMDATAS_LIST';
export const INIT_STOREDATA = 'INIT_STOREDATA';

// 封装remove函数用于生成action对象{type:xxx,payload:{xxx:xx}}
export function init(data){
    return {
        type:INIT_MAINDATAS,
        payload:data
    }
}
// 初始化storeData数据
export function initStore(data){
    return {
        type:INIT_STOREDATA,
        payload:data
    }
}
// 增加recommend数据
export function addRecommend(data){
    return {
        type:ADD_TO_RECOMDATAS,
        payload:data
    }
}
// 清空recommend数据
export function clearRecommend(){
    return {
        type:CLEAR_RECOMDATAS_LIST
    }
}
// 统一导出，在组件中统一引入为 HOMEAction
// 调用状态更新提交 this.props.dispatch(homeAction.remove(id));
export default {
    init,
    addRecommend,
    clearRecommend,
    initStore
}