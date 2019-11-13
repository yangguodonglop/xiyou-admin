import axios from 'axios';

let base = '';

// let ownbase ='http://xyj.grapefruitcloud.com' //外网接口
// let ownbase1 ='http://xyj.grapefruitcloud.com' //内网接口
// let ownbase2 ='http://xyj.grapefruitcloud.com' //内网接口

let ownbase = 'http://39.100.131.247' //外网接口
let ownbase1 = 'http://39.100.131.247' //内网接口
let ownbase2 = 'http://39.100.131.247' //内网接口


// let ownbase = 'http://10.0.0.72' //外网接口
// let ownbase1 = 'http://10.0.0.72' //内网接口
// let ownbase2 = 'http://10.0.0.72' //内网接口


export default {
    customData: function() {
        return ownbase;
    }

}




export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };


//新增

//登录
export const requestLoginOwn = params => { return axios.post(`${ownbase}/admin/system/login`, params).then(res => res.data); };
//添加用户
export const userinsert = params => { return axios.post(`${ownbase}/admin/system/userinsert`, params).then(res => res.data); };
//更新用户
export const userupdate = params => { return axios.post(`${ownbase}/admin/system/userupdate`, params).then(res => res.data); };

//获取添加用户列表
export const userlist = params => { return axios.post(`${ownbase}/admin/system/userlist`, params).then(res => res.data); };
//删除用户列表
export const userdelete = params => { return axios.post(`${ownbase}/admin/system/userdelete`, params).then(res => res.data); };
//路由列表获取
export const menulistfortree = params => { return axios.post(`${ownbase}/admin/system/menulistfortree`, params).then(res => res.data); };
//用户权限列表
export const rolelist = params => { return axios.post(`${ownbase}/admin/system/rolelist`, params).then(res => res.data); };
//用户权限修改
export const roleupdate = params => { return axios.post(`${ownbase}/admin/system/roleupdate`, params).then(res => res.data); };
//权限下拉列表
export const rolelistfortop = params => { return axios.post(`${ownbase}/admin/system/rolelistfortop`, params).then(res => res.data); };
//新增权限
export const roleinsert = params => { return axios.post(`${ownbase}/admin/system/roleinsert`, params).then(res => res.data); };
//栓除权限列表
export const roledelete = params => { return axios.post(`${ownbase}/admin/system/roledelete`, params).then(res => res.data); };
//新增菜单
export const menuinsert = params => { return axios.post(`${ownbase}/admin/system/menuinsert`, params).then(res => res.data); };
//更新菜单
export const menuupdate = params => { return axios.post(`${ownbase}/admin/system/menuupdate`, params).then(res => res.data); };
//删除菜单
export const menudelete = params => { return axios.post(`${ownbase}/admin/system/menudelete`, params).then(res => res.data); };



//更新权限
// export const roleupdate = params => { return axios.post(`${ownbase}/admin/system/roleupdate`, params).then(res => res.data); };






//	在线节点数
export const queryOnlineNodeHistgraphs = params => { return axios.post(`${ownbase}/overview/queryOnlineNodeHistgraph`, params).then(res => res.data); };
//实际存储数据量
export const queryStoreUsageHistgraph = params => { return axios.post(`${ownbase}/overview/queryStoreUsageHistgraph`, params).then(res => res.data); };

//tilte显示数量
export const querySummary = params => { return axios.post(`${ownbase}/overview/querySummary`, params).then(res => res.data); };

//存储量/存储空间  
export const queryDevStoreHistgraph = params => { return axios.post(`${ownbase}/overview/queryDevStoreHistgraph`, params).then(res => res.data); };
//存储文件数

export const queryFileCntHistgraph = params => { return axios.post(`${ownbase}/overview/queryFileCntHistgraph`, params).then(res => res.data); };
//文件查询
export const queryFileSummaryByConditions = params => { return axios.post(`${ownbase}/PTFSFileManage/queryFileSummaryByConditions`, params).then(res => res.data); };

//文件查看详情
export const queryOneFileBackupOwnerRecords = params => { return axios.post(`${ownbase}/PTFSFileManage/queryOneFileBackupOwnerRecords`, params).then(res => res.data); };

//黑名单查询
export const queryBlackListByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/queryBlackListByCondition`, params).then(res => res.data); };

//文件查看详情删除
export const deleteFileList = params => { return axios.post(`${ownbase}/PTFSFileManage/deleteFileList`, params).then(res => res.data); };
//文件查看备份
export const backupFileByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/backupFileByCondition`, params).then(res => res.data); };

//黑名单添加
export const addNewForbiddenFile = params => { return axios.post(`${ownbase}/PTFSFileManage/addNewForbiddenFile`, params).then(res => res.data); };

//黑名单批量添加
export const uploadBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/uploadBlackListFile`, params).then(res => res.data); };

//黑名单删除
export const updateBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/updateBlackListFile`, params).then(res => res.data); };

//地图节点查询
export const queryMinerGeographDist = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryMinerGeographDist`, params).then(res => res.data); };

//页面加载进来节点详细信息
export const queryOneCityMinerDistDetails = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryOneCityMinerDistDetails`, params).then(res => res.data); };
export const queryAllNodeProfiesByNodeTypes = params => { return axios.post(`${ownbase}/overview/queryAllNodeProfiesByNodeTypes`, params).then(res => res.data); };




//单个节点详细信息
export const queryNodeStoredFileListByNodeId = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeStoredFileListByNodeId`, params).then(res => res.data); };

//单个节点概览信息查询
export const queryNodeInfoById = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeInfoById`, params).then(res => res.data); };

//修改节点配置
export const queryAllConfigRecords = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllConfigRecords`, params).then(res => res.data); };

//新增节点配置更新
export const updateNodeConfig = params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//更新节点配置上传
//export const updateNodeConfig= params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//分区分组信息展示
export const queryRegionGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryRegionGroupInfo`, params).then(res => res.data); };
//分区分组点击组数查看i详情
export const queryGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryGroupInfo`, params).then(res => res.data); };

//缓存，备份更新后
export const queryAllNodesProfiles = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllNodesProfiles`, params).then(res => res.data); };

//日志查看
export const showNodeNetworkLogs = params => { return axios.post(`${ownbase}/PTFSLogSys/showNodeNetworkLogs`, params).then(res => res.data); };
//日志类型数据获取
export const queryLogTypes = params => { return axios.get(`${ownbase}/PTFSLogSys/queryLogTypes`, params).then(res => res.data); };
//删除要清空的日志列表
export const deleteHistoryDatas = params => { return axios.post(`${ownbase}/PTFSLogSys/deleteHistoryDatas`, params).then(res => res.data); };









//西柚机系统管理
//测试文件上传
export const updateNodeConfigtest = params => { return axios.post(`${ownbase}/admin/upload`, params).then(res => res.data); };
//系统管理获取数据列表
export const queryRom = params => { return axios.post(`${ownbase}/overview/queryRom`, params).then(res => res.data); };
//系统管理确定上传保存数据
export const saveRom = params => { return axios.post(`${ownbase}/overview/saveRom`, params).then(res => res.data); };
//系统管理删除数据
export const deleteRom = params => { return axios.post(`${ownbase}/overview/deleteRom`, params).then(res => res.data); };
//修改包数据查询单条数据信息
export const findRomById = params => { return axios.post(`${ownbase}/overview/findRomById`, params).then(res => res.data); };
//修改包数据确定修改
export const updateRom = params => { return axios.post(`${ownbase}/overview/updateRom`, params).then(res => res.data); };
//发布查询要发布版本的信息
export const getpacketbyversion = params => { return axios.post(`${ownbase}/overview/getpacketbyversion`, params).then(res => res.data); };
//确定发布
export const publish = params => { return axios.post(`${ownbase}/overview/publish`, params).then(res => res.data); };
//发布方式修改
export const updateMod = params => { return axios.post(`${ownbase}/overview/updateMod`, params).then(res => res.data); };
//发布版本列表* 
export const publishlist = params => { return axios.post(`${ownbase}/overview/publishlist`, params).then(res => res.data); };
//获取版本号列表
export const getversion = params => { return axios.post(`${ownbase}/overview/getversion`, params).then(res => res.data); };
//西柚机操作记录
export const actionlog = params => { return axios.post(`${ownbase}/PTFSLogSys/actionlog`, params).then(res => res.data); };
//上传到PTFS节点
export const uploadpfts = params => { return axios.post(`${ownbase}/overview/uploadpfts`, params).then(res => res.data); };
//获取当前发布版本以及灰度版本列表
export const versionlist = params => { return axios.post(`${ownbase}/overview/versionlist`, params).then(res => res.data); };

//撤销与i发布的版本、
export const rollback = params => { return axios.post(`${ownbase}/overview/rollback`, params).then(res => res.data); };





//西柚机应用管理
//西柚机应用管理上传
export const saveapp = params => { return axios.post(`${ownbase}/app/saveapp`, params).then(res => res.data); };
//西柚机应用管理获取APK文件信息
export const uploadapk = params => { return axios.post(`${ownbase}/admin/uploadapk`, params).then(res => res.data); };

//应用管理查询列表
export const applist = params => { return axios.post(`${ownbase}/app/applist`, params).then(res => res.data); };
//应用发布管理查询列表
export const appdevicelist = params => { return axios.post(`${ownbase}/app/devicelist`, params).then(res => res.data); };

//西柚机设备信息
export const devicelist = params => { return axios.post(`${ownbase}/device/devicelist`, params).then(res => res.data); };
//西柚机设备信息title
export const device_cnt_overview = params => { return axios.post(`${ownbase}/device_manage/device_cnt_overview`, params).then(res => res.data); };

//西柚机存储明细
export const ptfs_query_node_info_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_info_list`, params).then(res => res.data); };



//应用发布应用列表获取
export const applistfortree = params => { return axios.post(`${ownbase}/app/applistfortree`, params).then(res => res.data); };
//应用发布应用对应版本列表获取
export const verlistfortree = params => { return axios.post(`${ownbase}/app/verlistfortree`, params).then(res => res.data); };
//应用发布执行下发指令
export const devicectrl = params => { return axios.post(`${ownbase}/app/devicectrl`, params).then(res => res.data); };

//设备SN查看详情
export const getappbydev = params => { return axios.post(`${ownbase}/app/getappbydev`, params).then(res => res.data); };
//获取设备型号
export const getmactype = params => { return axios.post(`${ownbase}/app/getmactype`, params).then(res => res.data); };

//设备型号入库
export const savedevice = params => { return axios.post(`${ownbase}/device/savedevice`, params).then(res => res.data); };


//echars图标获取已完成应用的饼状数据图
export const getappstatistics = params => { return axios.post(`${ownbase}/app/getappstatistics `, params).then(res => res.data); };


//西柚机设备监控
//所有设备数据查询
export const query_general_info_list = params => { return axios.post(`${ownbase}/dev_status/query_general_info_list `, params).then(res => res.data); };
//获取设备最新状态
export const query_node_info = params => { return axios.post(`${ownbase}/dev_status/query_node_info `, params).then(res => res.data); };

//单个设备详情
export const query_detail_info_list = params => { return axios.post(`${ownbase}/dev_status/query_detail_info_list `, params).then(res => res.data); };

//IPFS业务数据统计
//设备热度分布
export const query_device_region_distribution = params => { return axios.post(`${ownbase}/bg_manager_tool/query_device_region_distribution `, params).then(res => res.data); };
//查询当天 top10 拉取次数排行榜
export const query_resource_export_rank = params => { return axios.post(`${ownbase}/bg_manager_tool/query_resource_export_rank `, params).then(res => res.data); };
//查询当天 top10 拉取流量的设备排行榜
export const query_stream_export_rank = params => { return axios.post(`${ownbase}/bg_manager_tool/query_stream_export_rank `, params).then(res => res.data); };
//根据条件，查询当\前设备统计明细
export const query_device_details = params => { return axios.post(`${ownbase}/bg_manager_tool/query_device_details `, params).then(res => res.data); };


//西柚机用户信息
//查询用户统计信息
export const ptfs_query_total_users = params => { return axios.post(`${ownbase}/account/ptfs_query_total_users `, params).then(res => res.data); };
//查询用户详情
export const ptfs_query_user_list = params => { return axios.post(`${ownbase}/account/ptfs_query_user_list `, params).then(res => res.data); };
//冻结/解冻用户
export const ptfs_forbid_users = params => { return axios.post(`${ownbase}/account/ptfs_forbid_users `, params).then(res => res.data); };

//用户管理存储力气管理
export const ptfs_total_profit_info = params => { return axios.post(`${ownbase}/miner_earn/ptfs_total_profit_info `, params).then(res => res.data); };

//用户存储力列表查询
export const ptfs_query_user_store_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_store_list `, params).then(res => res.data); };

//用户收益统计
//查看用户收益列表
export const ptfs_query_user_profit_info = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_profit_info `, params).then(res => res.data); };



//渠道统计
//渠道数据总览
export const query_3rd_stream_overview = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_stream_overview `, params).then(res => res.data); };
//渠道容量流量统计
export const query_3rd_capacity_stream_overview = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_capacity_stream_overview `, params).then(res => res.data); };
//渠道容量流量明细
export const query_3rd_capacity_stream_details = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_capacity_stream_details `, params).then(res => res.data); };

//文件统计
//文件热度分布
export const city_heat = params => { return axios.post(`${ownbase}/file_bgmgr/city_heat `, params).then(res => res.data); };
 // 下载排名
 export const file_dl_range = params => { return axios.post(`${ownbase}/file_bgmgr/file_dl_range `, params).then(res => res.data); };
//时间热度
export const time_heat = params => { return axios.post(`${ownbase}/file_bgmgr/time_heat `, params).then(res => res.data); };
//文件总览
export const file_outline = params => { return axios.post(`${ownbase}/file_bgmgr/file_outline `, params).then(res => res.data); };
//查询文件存储
export const file_store = params => { return axios.post(`${ownbase}/file_bgmgr/file_store `, params).then(res => res.data); };
//文件上传明细
export const file_dlinfo = params => { return axios.post(`${ownbase}/file_bgmgr/file_dlinfo `, params).then(res => res.data); };

//西柚机系统管理 
//查询备用地址配置
export const query_domain_list = params => { return axios.post(`${ownbase1}/domain/query_domain_list `, params).then(res => res.data); };

//修改备用地址配置
export const modify_domain_list = params => { return axios.post(`${ownbase1}/domain/modify_domain_list `, params).then(res => res.data); };

//PTFS节点管理
//节点控制台
export const send_ptfs_cmd = params => { return axios.post(`${ownbase2}/bg_manager_tool/send_ptfs_cmd`, params).then(res => res.data); };
export const query_ptfs_cmd_result = params => { return axios.post(`${ownbase}/bg_manager_tool/query_ptfs_cmd_result`, params).then(res => res.data); };

                               