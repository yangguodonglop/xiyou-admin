
import App from './App'

import store from './store/index'
import Vuex from 'vuex'
Vue.use(Vuex);

import VCharts from 'v-charts'
import common from "./common/js/util.js";
Vue.prototype.common = common
    //import NProgress from 'nprogress'
    //import 'nprogress/nprogress.css'
import router from './routes'


//---start
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import index from './views/echars/index.vue'
import distributed from './views/nodes/distributed.vue'
import grouping from './views/nodes/grouping.vue'
import nodequery from './views/nodes/nodequery.vue'
import updatenode from './views/nodes/updatenode.vue'
import nodeconsole from './views/nodes/nodeconsole.vue'
import consolelog from './views/nodes/consolelog.vue'
import middleauthority from './views/authority/middle.vue'
import adduser from './views/authority/adduser.vue'
import managementuser from './views/authority/managementuser.vue'
import managementauthority from './views/authority/managementauthority.vue'
 
import logs from './views/nodes/logs.vue'
import filequery from './views/files/filequery.vue'
import blacklist from './views/files/blacklist.vue'
import kakfa from './views/kakfa/kakfa.vue'
import miningmachine from './views/miningmachine/miningmachine.vue'
import middlenodes from './views/nodes/middle.vue'
import middlefiles from './views/files/middle.vue'
import middledevive from './views/devicemanagement/middle.vue'
import middleuser from './views/usercenter/middle.vue'
import middledevice from './views/devicemanagement/middle.vue'
import userinformation from './views/usercenter/deviceinformation.vue'
import userinformation1 from './views/usercenter/deviceinformation1.vue'
import storagepower from './views/usercenter/storagepower.vue'
import system from './views/devicemanagement/system.vue'
import systemset from './views/devicemanagement/systemset.vue'
import recording from './views/devicemanagement/recording.vue'

import application from './views/application/applicationmanagement.vue'
import applicationmiddle from './views/application/middle.vue'
import releasemanagement from './views/application/releasemanagement.vue'
import deviceinformation from './views/deviceinformation/information.vue'
import monitor from './views/devicemanagement/monitor.vue'
import detail from './views/devicemanagement/detail.vue'
import storage from './views/devicemanagement/storage.vue'
import income from './views/income/income.vue'
import overview from './views/fileoverview/overview.vue'
import middleoverview from './views/fileoverview/middle.vue'
import documentdetails from './views/fileoverview/documentdetails.vue'
import uploaddetails from './views/fileoverview/uploaddetails.vue'
import filedistribution from './views/fileoverview/filedistribution.vue'

import middleequipment from './views/equipmentdistribution/middle.vue'
import equipmentheat from './views/equipmentdistribution/equipmentheat.vue'
import devicestatistics from './views/equipmentdistribution/devicestatistics.vue'

import middlechannel from './views/channel/middle.vue'
import channeindex from './views/channel/index.vue'
import capacitystatistics from './views/channel/capacitystatistics.vue'
import capacitybreakdown from './views/channel/capacitybreakdown.vue'
import systems from './views/system/index.vue'
//---end


//Vue.use(ElementUI)
//Vue.use(VueRouter)
//Vue.use(Vuex)
Vue.use(VCharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(echarts)

//import axios from 'axios';
//import vuePopper from 'element-ui/lib/utils/vue-popper';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Vue.prototype.$axios = axios;

import "babel-polyfill";

// const router = new VueRouter({
//     routes
// })
// import axios from 'axios'
// import {
//     menulistfortree
// } from '../api/api';
// console.log(router)
// router.beforeEach((to, from, next) => {
//     menulistfortree(loginParams).then(res=>{
//                 console.log(res)
//                     }).catch(error=>{

//                     })
//     var user = JSON.parse(common.get('userInfo'))
//     if(to.meta.requireAuth){
//         if(user){
//             next()
//         }
//         else{
//             next({path:"/Login"})
//         }
//     }
//     else{
//         next()
//     }



//  })
///--start
import {
    menulistfortree
} from './api/api';
var user = JSON.parse(common.get('userInfo'))
if (user) {
    console.log(store.state.userInfo.id)
    let param= new Object
    if(store.state.userInfo.id){
         param.id=store.state.userInfo.id
    }
   
    
    menulistfortree(param).then(res => {
        var newRoutes 
        //console.log(res)
        var keymap= {
            'Home':Home,
           // 'userinformation':userinformation, 
            // 'storagepower': storagepower,
            // 'deviceinformation':deviceinformation,
            // 'monitor': monitor,
            // 'detail': detail,
            // 'application': application,
            // 'releasemanagement': releasemanagement,
            // 'storage': storage,
            // 'system': system,
            // 'systemset': systemset,
            // 'recording': recording,
            // 'income': income,
            'adduser': adduser,
            'managementuser': managementuser,
            'managementauthority':managementauthority,
            // 'middledevive':middledevive,
            // 'applicationmiddle':applicationmiddle,
            // 'systems':systems
                        'userinformation1':userinformation1, 


        }
      // var  newRoutes =res.msg
      var newRoutes=  [ {
        path: "/",
        component: 'Home',
        name: "西柚机用户信息",
        icon: 'el-icon-menu',
        children: [
            {
                path: "/managementauthority",
                name: "权限管理",
                component: 'managementauthority',
                icon: 'el-icon-menu',
                meta : {                     
                    requireAuth:true    
                 }
            },
            {
                path: "/adduser",
                name: "添加用户",
                component: 'adduser',
                icon: 'el-icon-menu',
                meta : {                     
                    requireAuth:true    
                 }
            },
            {
                path: "/managementuser",
                name: "用户管理",
                component: 'managementuser',
                icon: 'el-icon-menu',
                meta : {                     
                    requireAuth:true    
                 }
            }
            ]
      }]
       console.log(newRoutes);
        //console.log(newRoutes)
       // console.log(common.trans(newRoutes,keymap))
        var routes = common.trans(newRoutes,keymap)
        console.log(routes)
        var router = new VueRouter({
            routes: routes
        })
        new Vue({
            //el: '#app',
            //template: '<App/>',
            router,
            store,
            //components: { App }
            render: h => h(App)
        }).$mount('#app')
    }).catch(error => {
        console.log(error)
    })
    
} else {
    new Vue({
        //el: '#app',
        //template: '<App/>',
        router,
        store,
        //components: { App }
        render: h => h(App)
    }).$mount('#app')
}
///--end


