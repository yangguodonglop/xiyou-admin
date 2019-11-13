//新路由
import Login from './views/Login.vue'
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








let routes = [
    {
		path: '/',
        component: Login,
        hidden: true
	},

    {
        path: "/",
        component: Home,
        name: "西柚机用户信息",
        icon: 'el-icon-menu',
        children: [{
                path: "/userinformation",
                name: "西柚机用户信息",
                component: userinformation,
                icon: 'el-icon-menu',
            },
            {
                path: "/storagepower",
                name: "西柚机储存力管理",
                component: storagepower,
                icon: 'el-icon-menu',
            },
        ]
    },
    {
        path: "/b",
        component: Home,
        name: "西柚机管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/deviceinformation",
                name: "西柚机设备信息",
                component: deviceinformation,
                icon: 'el-icon-menu',
            },
            {
                path: "/monitor",
                name: "西柚机设备监控",
                component:monitor,
                icon: 'el-icon-menu',
            },
            {
                path: "/detail",
                name: "西柚机存储明细",
                component:detail,
                icon: 'el-icon-menu',
            },
            {
                path: "/application",
                name: "西柚机应用管理",
                component: applicationmiddle,
                icon: 'el-icon-menu',
                children: [{
                        path: "/application",
                        name: "西柚机应用管理",
                        component: application,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/releasemanagement",
                        name: "应用发布管理",
                        component: releasemanagement,
                        icon: 'el-icon-menu',
                    },
                ]
            },
            {
                path: "/storage",
                name: "入库管理",
                component:storage,
                icon: 'el-icon-menu',
            },
            {
                path: "/system",
                name: "西柚机系统管理",
                component: middledevive,
                icon: 'el-icon-menu',
                children: [{
                        path: "/system",
                        name: "西柚机系统管理",
                        component: system,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/systemset",
                        name: "西柚机发布设置",
                        component: systemset,
                        icon: 'el-icon-menu',
                    },
                    {
                        path: "/recording",
                        name: "西柚机操作记录",
                        component: recording,
                        icon: 'el-icon-menu',
                    },
                ]
            },

        ]
    },
    {
        path: "/f",
        component: Home,
        name: "西柚机系统管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/systems",
                name: "备用地址配置",
                component:systems,
                icon: 'el-icon-menu',
            },

        ]
    },
    {
        path: "/c",
        component: Home,
        name: "西柚机收益管理",
        icon: 'el-icon-menu',
        children: [{
                path: "/income",
                name: "西柚机用户收益统计",
                component:income,
                icon: 'el-icon-menu',
            },

        ]
    },
    // {
    //     path: "/e",
    //     component: Home,
    //     name: "IPFS业务数据统计",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/middleequipment",
    //             name: "设备统计",
    //             component: middleequipment,
    //             icon: 'el-icon-menu',
    //             children: [{
    //                 path: "/equipmentheat",
    //                 name: "设备热度分布",
    //                 component: equipmentheat,
    //                 icon: 'el-icon-menu',
    //             },
    //             {
    //                 path: "/devicestatistics",
    //                 name: "设备统计明细",
    //                 component: devicestatistics,
    //                 icon: 'el-icon-menu',
    //             }
    //         ],
    //         },
         
    //         {
    //             path: "/middleoverview",
    //             name: "文件统计",
    //             component: middleoverview,
    //             icon: 'el-icon-menu',
    //             children: [{
    //                     path: "/filedistribution",
    //                     name: "文件热度分布",
    //                     component: filedistribution,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/overview",
    //                     name: "文件总览",
    //                     component: overview,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/documentdetails",
    //                     name: "文件存储明细",
    //                     component: documentdetails,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/uploaddetails",
    //                     name: "文件上传明细",
    //                     component: uploaddetails,
    //                     icon: 'el-icon-menu',
    //                 },
    //             ]
    //         },
    //         {
    //             path: "/middlechannel",
    //             name: "渠道统计",
    //             component: middlechannel,
    //             icon: 'el-icon-menu',
    //             children: [{
    //                     path: "/channeindex",
    //                     name: "渠道数据总览",
    //                     component: channeindex,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/capacitystatistics",
    //                     name: "渠道容量流量统计",
    //                     component: capacitystatistics,
    //                     icon: 'el-icon-menu',
    //                 },
    //                 {
    //                     path: "/capacitybreakdown",
    //                     name: "渠道容量流量明细",
    //                     component: capacitybreakdown,
    //                     icon: 'el-icon-menu',
    //                 },
           
    //             ]
    //         },

    //     ]
    // },
    // {
    //     path: "/d",
    //     component: Home,
    //     name: "消息发布",
    //     icon: 'el-icon-menu',
    //     children: [{
    //             path: "/fabul",
    //             name: "消息发布管理",
    //             icon: 'el-icon-menu',
    //         },

    //     ]
    // }
    {
        path: "/a",
        component: Home,
        name: "权限管理",
        icon: 'el-icon-menu',
           children: [{
                    path: "/adduser",
                    component: adduser,
                    name: "添加用户",
                    icon: 'el-icon-menu',
                },
                {
                    path: "/managementuser",
                    component: managementuser,
                    name: "管理系统用户",
                    icon: 'el-icon-menu',
                    // children: [{
                    //         path: "/distributed",
                    //         component: distributed,
                    //         name: "节点分布",
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/grouping",
                    //         component: grouping,
                    //         name: "分区分组",
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/nodequery",
                    //         name: "节点查询",
                    //         component: nodequery,
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/updatenode",
                    //         name: "更新节点配置",
                    //         component: updatenode,
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/logs",
                    //         name: "日志查看",
                    //         component: logs,
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/nodeconsole",
                    //         name: "节点控制台",
                    //         component: nodeconsole,
                    //         icon: 'el-icon-menu',
                    //     },
                    //     {
                    //         path: "/consolelog",
                    //         name: "控制台日志",
                    //         component: consolelog,
                    //         icon: 'el-icon-menu',
                    //     }
                        
                    // ]
                },
                // {
                //     path: "/middlefiles",
                //     component: middlefiles,
                //     name: "IPFS文件管理",
                //     icon: 'el-icon-menu',
                //     children: [{
                //             path: "/filequery",
                //             name: "文件查询",
                //             component: filequery,
                //             icon: 'el-icon-menu',
                //         },
                //         {
                //             path: "/blacklist",
                //             name: "黑名单",
                //             component: blacklist,
                //             icon: 'el-icon-menu',
                //         },
    
                //     ]
                // },
    
            ]
        },
]

router.beforeEach((to, from, next) => {
 
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    console.log(")))))))")
    const nextRoute = ['user','device'];
    // let isLogin = global.isLogin;  // 是否登录
  
    let isLogin = store.state.Authorization
  
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf(to.name) >= 0) {  
      if (!isLogin) {
        console.log('what fuck');
        router.push({ name: 'login' ,query: {redirect: to.path}})
      }else{
        next({
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
      // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin) {
      router.push({ name: 'home' });
    }
  }
  next({
    query: {
      redirect: to.fullPath
    }
  });
});

export default routes;