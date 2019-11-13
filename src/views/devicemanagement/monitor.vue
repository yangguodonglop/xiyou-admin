<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active row_active_monitor">
                <el-form-item label="设备SN">
                    <el-input v-model="form.dev_sn" placeholder="请输入设备SN"></el-input>
                </el-form-item>
                <el-form-item label="节点ID">
                    <el-input v-model="form.node_id" placeholder="请输入节点ID"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.start_time" :clearable="false" value-format="timestamp" @change="onChangeStartTime" type="date" placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.end_time" :clearable="false" value-format="timestamp" type="date" @change="onChangeEndTime" placeholder="选择结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="问题筛选">
                    <el-select v-model="value" placeholder="请选择" @change="onChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="getInfo()" style="margin-left:30px;">查询</el-button>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">

        <!-- <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
        </el-row> -->
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @handleSelectionChange="handleSelectionChange"></tableBar>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <myDatanums :dataNum="dataNum"></myDatanums>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation">
        <div class="devide_pageNation_active">
            <el-row type="flex">
                <el-col :span="6">
                    <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
                </el-col>
            </el-row>
        </div>
    </div>
    <el-dialog :visible.sync="monitorDetails" class="monitor-details" :show-close="false" :close-on-click-modal="false">
        <div class="monitor-con">
            <div class="monitorDetails-top">
                <table class="basic-table">
                    <tbody>
                        <tr>
                            <td class="td-title">设备SN</td>
                            <td class="td-text">{{details_table.dev_sn}}</td>
                            <td class="td-title">CPU温度</td>
                            <td class="td-text active">{{details_table.cpu_tem}}</td>
                        </tr>
                        <tr>
                            <td class="td-title">节点ID</td>
                            <td class="td-text">{{details_table.node_id}}</td>
                            <td class="td-title">主板温度</td>
                            <td class="td-text active">{{details_table.mb_tem}}</td>
                        </tr>
                        <tr>
                            <td class="td-title">设备状态</td>
                            <td class="td-text">{{details_table.online_status}}</td>
                            <td class="td-title">硬盘温度</td>
                            <td class="td-text active">{{details_table.hd_tmp}}</td>
                        </tr>
                        <tr>
                            <td class="td-title">当前上行宽带</td>
                            <td class="td-text">{{details_table.up_bandwidth}}</td>
                            <td class="td-title">内存占用</td>
                            <td class="td-text active">{{details_table.mem_ratio}}</td>
                        </tr  >
                        <tr>
                            <td class="td-title">当日在线时长</td>
                            <td class="td-text">{{details_table.online_time}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="monitorDetails-bottom">
                <div class="searach-con">
                    <el-form ref="form" :model="form">
                        <el-row type="flex" class="row_active row_active_monitor">
                            <el-form-item label="上传记录" style="margin-left:0px;">

                            </el-form-item>
                            <!-- <el-form-item label="开始时间">
                                <el-date-picker v-model="form.value1" :clearable="false" @change="onChangeStartTimeActive" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间">
                                <el-date-picker v-model="form.value2" :clearable="false" @change="onChangeEndTimeActive" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item> -->
                            <el-form-item label="问题筛选">
                                <el-select v-model="value" placeholder="请选择" @change="onChangeActive">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-button type="primary" @click="getInfoActive()" style="margin-left:30px;">查询</el-button>
                        </el-row>
                    </el-form>
                </div>
                <tableBar :tableData="tableDataActive" :rowHeader="rowHeader1" :tableOption="tableOption" :operatingStatus="operatingStatus1"></tableBar>
                <pageNation :pager="pagerActive" @handleSizeChange="handleSizeChange1" @handleCurrentChange="handleCurrentChange1" class="monitorDetails-page"></pageNation>
            </div>
            <div slot="footer" class="monitor-footer" style="">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="getInfoActive()">确 定</el-button>
            </div>
        </div>
    </el-dialog>

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
    devicelist,
    query_general_info_list,
    query_node_info,
    query_detail_info_list
} from "../../api/api.js";
import common from "../../common/js/util.js"
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            operatingStatus: true,
            operatingStatus1: false,
            monitorDetails: false,
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "time_stamp",
                    label: "时间",
                    width: 150,
                },
                {
                    prop: "dev_sn",
                    label: "设备SN",
                    width: 180,
                },
                {
                    prop: "node_id",
                    label: "节点ID",
                    width: 350,
                },
                {
                    prop: "online_status",
                    label: "设备状态",
                    width: 80,
                },
                {
                    prop: "total_cap",
                    label: "当前使用空间/总空间",
                    width: 180,
                },
                {
                    prop: "up_bandwidth",
                    label: "当前上行带宽",
                    width: 100,
                },
                {
                    prop: "online_time",
                    label: "当日在线时长",
                    width: 100,
                },
                {
                    prop: "alarm_status_text",
                    label: "今日安全状态"
                },

            ],
            rowHeader1: [
                // 未做任何格式化处理的数据
                {
                    prop: "time_stamp",
                    label: "时间"
                },
                {
                    prop: "dev_sn",
                    label: "设备SN"
                },
                {
                    prop: "node_id",
                    label: "节点ID",
                    width: 350,
                },
                {
                    prop: "cpu_tem",
                    label: "CPU温度"
                },
                {
                    prop: "mb_tem",
                    label: "主板温度",
                    width: 200,
                },
                {
                    prop: "hd_tem",
                    label: "硬盘温度"
                },
                {
                    prop: "mem_ratio",
                    label: "内存占用"
                },

            ],
            tableDataActive: [],
            tableData: [],
            dev_sn: '',
            tableOption: {
                label: "操作",
                width: 80,
                options: [{
                    label: "查看详情",
                    type: "primary",
                    methods: "editOnchange"
                }, ]
            },
            pager: {
                count: 0,
                page: 0,
                rows: 10
            },
            pagerActive: {
                count: 0,
                page: 1,
                rows: 10
            },
            form: {
                node_id: "",
                dev_sn: "",
                start_time: "",
                end_time: "",
                alarm_type: "0",
                value1: "",
                value2: ""
            },
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: false,
            push_key: "",
            options: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: 'CPU报警温度'
                }, {
                    value: '2',
                    label: '主板报警温度'
                }, {
                    value: '3',
                    label: '磁盘报警温度'
                }, {
                    value: '4',
                    label: '剩余磁盘容量比例报警'
                }, {
                    value: '5',
                    label: '内存比例报警'
                }
            ],
            value: '',
            query_type: 0,
            details_table: {
                dev_sn: "",
                node_id: "",
                online_status: "",
                up_bandwidth: "",
                cap_num: 0,
                cpu_tem: "",
                mb_tem: "",
                hd_tmp: ""
            },
            start_time: "",
            end_time: "",
            start_time_active: "",
            end_time_active: "",
            alarm_type: 0,
            alarm_status: '',

        };
    },
    mounted: function () {

        this.push_key = this.$route.query.push_key
        this.dataNum = this.tableData.length;
        let nowTimes = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);

        let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000);
        let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000);
        this.end_time = Math.round(nowTimes.getTime() / 1000),
           // this.end_time_active = Math.round(nowTimes.getTime() / 1000),
            this.start_time = Math.round(befDate.getTime() / 1000),
           // this.start_time_active = Math.round(befDateActive.getTime() / 1000),
            this.queryInfo()
    },
    methods: {
        onClose() {
             this.monitorDetails = false
            // this.form.value1 = "",
            //     this.form.value2 = "",
            //     this.alarm_status = ""
            // this.value = ""
            // //     this.pagerActive.page = 1
            // // this.pager.page = 1
            // let nowTimes = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)

            // let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000)
            // let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000)
            // this.end_time = Math.round(nowTimes.getTime() / 1000)
            // this.end_time_active = Math.round(nowTimes.getTime() / 1000)
            // this.start_time = Math.round(befDate.getTime() / 1000)
            // this.start_time_active = Math.round(befDateActive.getTime() / 1000)

        },
        onChange(item) {
            this.form.alarm_type = item
        },
        onChangeActive(item) {
            this.alarm_status = item
        },
        handleButton(val) {
            this.alarm_status = val.row.alarm_status
            this.monitorDetails = true
            this.dev_sn = val.row.dev_sn
            console.log(val.row)
            var nowTime = new Date(val.row.time_stamp)
            let param = new Object()
            param.time_stamp = (nowTime.getTime()/1000+24*3600-1)
            // alert(nowTime.getTime()/1000)
            //  alert(nowTime.getTime()/1000+24*3600-1)
            this.start_time_active=Math.round(nowTime.getTime()/1000)
            this.end_time_active=Math.round(nowTime.getTime()/1000+24*3600-1)
           // this.start_time_active=Math.round(nowTime.getTime()/1000)
            param.dev_sn = val.row.dev_sn
            query_node_info(param).then(res => {
                if (res.status == 0 && res.err_code != 0) {
                    let errorId = res.err_code
                    this.$message({
                        message: `${this.common.getErrorcodeInfo(errorId)}`,
                        type: "info"
                    });
                    this.details_table = {}
                } else {
                    this.details_table.dev_sn = val.row.dev_sn
                    this.details_table.node_id = val.row.node_id
                    this.details_table.online_status = val.row.online_status
                    this.details_table.up_bandwidth = val.row.up_bandwidth
                    this.details_table.online_time = val.row.online_time
                    this.details_table.mem_ratio = ((res.data.mem_ratio)/100) + "%"
                    this.details_table.cpu_tem = ((res.data.cpu_tem) / 100) + "℃"
                    this.details_table.mb_tem = ((res.data.mb_tem) / 100) + "℃"
                    this.details_table.hd_tmp = ((res.data.hd_tmp) / 100) + "℃"
                }
            }).catch(err => {})
            this.queryDevInfo()

        },
        //查看详情查看单个设备
        queryDevInfo() {
            let paramActive = new Object()
            paramActive.start_time = this.start_time_active,
                paramActive.end_time = this.end_time_active,
                paramActive.query_type = 1,
                paramActive.dev_sn = this.dev_sn
            paramActive.alarm_type = this.alarm_status,

                paramActive.page = this.pagerActive.page - 1
            query_detail_info_list(paramActive)
                .then(res => {
                    if (res.status == 0 && res.err_code != 0) {
                        let errorId = res.err_code
                        this.$message({
                            message: `${this.common.getErrorcodeInfo(errorId)}`,
                            type: "info"
                        });
                        this.tableDataActive = []
                    } else {
                        if (res.data.dev_detail_info_list) {
                            let nowarrLength = res.data.total_num

                            this.pagerActive.count = nowarrLength
                            let nowarractive = res.data.dev_detail_info_list
                            for (var i = 0; i < nowarractive.length; i++) {
                                nowarractive[i].time_stamp = this.common.getTimes(parseInt(nowarractive[i].time_stamp * 1000))
                                nowarractive[i].cpu_tem = ((nowarractive[i].cpu_tem) / 100) + "℃"
                                nowarractive[i].mb_tem = ((nowarractive[i].mb_tem) / 100) + "℃"
                                nowarractive[i].hd_tem = ((nowarractive[i].hd_tem) / 100) + "℃"
                                nowarractive[i].mem_ratio = ((nowarractive[i].mem_ratio)/100) + "%"
                            }
                            this.tableDataActive = nowarractive
                        }

                    }
                }).catch(err => {})
        },
        //改变起始时间

        onChangeStartTime(val) {
            this.start_time = Math.round(val / 1000)
        },
        onChangeEndTime(val) {
            this.end_time = Math.round(val / 1000)
        },
        onChangeStartTimeActive(val) {
            this.start_time_active = Math.round(val / 1000)
        },
        onChangeEndTimeActive(val) {
            this.end_time_active = Math.round(val / 1000)
        },

        handleSelectionChange(val) {
            this.alertNum = val.length
        },
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryInfo()

        },
        handleCurrentChange1(val) {
            this.pagerActive.page = val.val
            this.queryDevInfo()

        },
        getInfoActive() {
            if (this.end_time - this.start_time_active < 0) {
                this.$message({
                    message: "结束时间不能小于起始时间",
                    type: "error"
                });
                return false
            }
            this.queryDevInfo()
        },
        getInfo() {
            if (this.end_time - this.start_time < 0) {
                this.$message({
                    message: "结束时间不能小于起始时间",
                    type: "error"
                });
                return false
            }
            if (this.form.node_id != "" || this.form.dev_sn != "") {
                this.query_type = 1
            } else {
                this.query_type = 0
            }
            this.queryInfo()
        },
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.end_time = this.end_time,
                param.start_time = this.start_time,
                param.query_type = this.query_type,
                param.dev_sn = this.form.dev_sn,
                param.alarm_type = this.form.alarm_type
            param.page = this.pager.page - 1
            param.node_id = this.form.node_id

            query_general_info_list(param)
                .then(res => {
                    if (res.status == 0 && res.err_code != 0) {
                        let errorId = res.err_code
                        this.$message({
                            message: `${this.common.getErrorcodeInfo(errorId)}`,
                            type: "info"
                        });
                        this.tableData = []
                    } else {
                        if (res.data.dev_detail_info_list) {
                            let nowarractive = res.data.dev_detail_info_list
                            let nowarrLength = res.data.total_num
                            this.pager.count = nowarrLength
                            this.dataNum = nowarrLength
                            for (var i = 0; i < nowarractive.length; i++) {
                                nowarractive[i].time_stamp = this.common.getTimeDay(parseInt(nowarractive[i].time_stamp * 1000))
                                switch (nowarractive[i].online_status) {
                                    case 1:
                                        nowarractive[i].online_status = "在线"
                                        break;
                                    case 0:
                                        nowarractive[i].online_status = "离线"
                                        break;
                                }
                                let nowstr = nowarractive[i].alarm_status
                                let nowArr = nowstr.split(",")
                                let tempStr = ""
                                for (var j = 0; j < nowArr.length; j++) {
                                    if (nowArr[j] == 1) {
                                        tempStr += "CPU过热,"
                                    } else if (nowArr[j] == 2) {
                                        tempStr += "主板过热,"
                                    } else if (nowArr[j] == 3) {
                                        tempStr += "硬盘过热,"
                                    } else if (nowArr[j] == 4) {
                                        tempStr += "硬盘容量不足,"
                                    } else if (nowArr[j] == 5) {
                                        tempStr += "内存不足,"
                                    } else if (nowArr[j] == 9) {
                                        tempStr += "宕机"
                                    } else if (nowArr[j] == 0) {
                                        tempStr += "正常"
                                    }
                                }
                                nowarractive[i].alarm_status_text = tempStr
                                nowarractive[i].online_time = (nowarractive[i].online_time / 3600).toFixed(2) + "h"
                                nowarractive[i].total_cap = this.common.formatByteActive(nowarractive[i].use_cap) + "/" + this.common.formatByteActive(nowarractive[i].total_cap)
                                nowarractive[i].up_bandwidth = this.common.formatByteActive(nowarractive[i].up_bandwidth)
                            }
                            this.tableData = nowarractive
                        } else {
                            this.tableData = []
                        }

                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },

    },
    components: {
        titleBar: titleBar,
        tableBar: tableBar,
        pageNation: pageNation,
        formInput: formInput,
        genderSelector: genderSelector,
        dateTimePicker: dateTimePicker,
        myDropdown: myDropdown,
        myAlert: myAlert,
        myDatanums: myDatanums
    }
};
</script>

<style lang="less">
.myself-container {
    width: 100%;
    min-width: 1600px;

    .devide_title {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 10px;
        background: #f2f2f2;
        padding: 15px 0px;
        box-sizing: border-box;

        .el-col {
            padding: 0px 20px;
        }
    }

    .device_form {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;
        background: #f2f2f2;
        padding: 15px 30px;
        box-sizing: border-box;

        .el-form-item {
            margin-bottom: 0px;
        }

        .row_active {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &.row_active_monitor {
                .el-form-item__label {
                    white-space: nowrap;
                }

                justify-content: flex-start;

                .el-form-item {
                    margin-left: 30px;
                }
            }
        }

        .div_show {
            width: auto;
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            color: #409eff;
            cursor: pointer;
        }
    }

    .devide_table {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .el-table td,
        .el-table th {
            padding: 6px 0px;
        }

        .row_active {
            margin-top: 10px;
        }
    }

    .devide_pageNation {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .devide_pageNation_active {
            float: right;
        }
    }

    .monitor-details {
        .el-dialog__body {
            padding-top: 0px;
        }

        .el-dialog {
            width: 80%
        }

        .monitor-con {
            width: 100%;
            margin: 0 auto;

            .basic-table {
                border: 1px solid#DCDFE6;
                border-collapse: collapse;
                // width: 100%;
                margin-top: 20px;
                margin-bottom: 20px;

                td {
                    border: 1px solid #DCDFE6;
                    padding: 8px 0px;

                    &.td-title {
                        background: #ebebeb;
                        text-align: center;
                        width: 150px;
                    }

                    &.td-text {
                        text-align: center;
                        width: 400px;

                        &.active {
                            width: 200px;
                        }
                    }

                }
            }

            .monitor-footer {
                display: flex;
                justify-content: center;
                margin: 0 auto;
            }

            .monitorDetails-bottom {

                .el-table td,
                .el-table th {
                    padding: 6px 0px;
                }

                height: auto;
                overflow: hidden;

                .searach-con {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 20px;

                    .el-form-item {
                        margin-left: 25px;
                        margin-bottom: 0px;
                    }
                }

                .monitorDetails-page {
                    float: right;
                    height: 40px;
                    overflow: hidden;
                    margin: 10px auto;
                }
            }
        }

    }

}
</style>
