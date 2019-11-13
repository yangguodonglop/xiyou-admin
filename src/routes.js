//新路由
import Login from './views/Login.vue'


import VueRouter from 'vue-router'



Vue.use(VueRouter)


var routes = [{
        path: '/',
        component: Login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }
    ,
    {
        path: "*",
        redirect: "/"
    }
    // {
    //     path: "/",
    //     component: Home,
    //     name: "西柚机用户信息",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/",
    //             name: "西柚机用户信息",
    //             component: userinformation,
    //             icon: 'el-icon-menu',
    //             meta : {                     
    //                 requireAuth:true    
    //              }
    //         },
    //         {
    //             path: "/storagepower",
    //             name: "西柚机储存力管理",
    //             component: storagepower,
    //             icon: 'el-icon-menu',
    //         },
    //     ]
    // },
    // {
    //     path: "/b",
    //     component: Home,
    //     name: "西柚机管理",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/deviceinformation",
    //             name: "西柚机设备信息",
    //             component: deviceinformation,
    //             icon: 'el-icon-menu',
    //         },
    //         {
    //             path: "/monitor",
    //             name: "西柚机设备监控",
    //             component:monitor,
    //             icon: 'el-icon-menu',
    //         },
    //         {
    //             path: "/detail",
    //             name: "西柚机存储明细",
    //             component:detail,
    //             icon: 'el-icon-menu',
    //         },
    //         {
    //             path: "/application",
    //             name: "西柚机应用管理",
    //             component: applicationmiddle,
    //             icon: 'el-icon-menu',
    //             children: [{
    //                     path: "/application",
    //                     name: "西柚机应用管理",
    //                     component: application,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/releasemanagement",
    //                     name: "应用发布管理",
    //                     component: releasemanagement,
    //                     icon: 'el-icon-menu',
    //                 },
    //             ]
    //         },
    //         {
    //             path: "/storage",
    //             name: "入库管理",
    //             component:storage,
    //             icon: 'el-icon-menu',
    //         },
    //         {
    //             path: "/system",
    //             name: "西柚机系统管理",
    //             component: middledevive,
    //             icon: 'el-icon-menu',
    //             children: [{
    //                     path: "/system",
    //                     name: "西柚机系统管理",
    //                     component: system,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/systemset",
    //                     name: "西柚机发布设置",
    //                     component: systemset,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/recording",
    //                     name: "西柚机操作记录",
    //                     component: recording,
    //                     icon: 'el-icon-menu',
    //                 },
    //             ]
    //         },

    //     ]
    // },
    // {
    //     path: "/f",
    //     component: Home,
    //     name: "西柚机系统管理",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/systems",
    //             name: "备用地址配置",
    //             component:systems,
    //             icon: 'el-icon-menu',
    //         },

    //     ]
    // },
    // {
    //     path: "/c",
    //     component: Home,
    //     name: "西柚机收益管理",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/income",
    //             name: "西柚机用户收益统计",
    //             component:income,
    //             icon: 'el-icon-menu',
    //         },

    //     ]
    // },
    // {
    //     path: "/a",
    //     component: Home,
    //     name: "权限管理",
    //     icon: 'el-icon-menu',
    //        children: [{
    //                 path: "/adduser",
    //                 component: adduser,
    //                 name: "添加用户",
    //                 icon: 'el-icon-menu',
    //             },
    //             {
    //                 path: "/managementuser",
    //                 component: managementuser,
    //                 name: "管理系统用户",
    //                 icon: 'el-icon-menu',
    //             },


    //         ]
    //     },
]


var router = new VueRouter({
    routes: routes
})

export default router;