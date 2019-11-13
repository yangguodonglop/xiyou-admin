import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
//import store from './store' //注册store
Vue.use(Vuex); //使用 vuex
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({ storage: window.localStorage })

const state = {
    userRouter:[],
    userInfo:{}
}

const mutations = {
    setUserInfo(state,str){
        state.userInfo=str
    }

}

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    plugins: [vuexLocal.plugin]
})

 export default store;