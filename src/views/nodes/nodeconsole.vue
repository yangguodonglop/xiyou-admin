<template>
<section class="myself-container ">
    <div class="device_form device_form_active">
        <div class="node_title">目标节点筛选</div>
        <el-form ref="form" :model="form">
            <el-row type="flex" class="node_row">
                <div class="title">节点：</div>
                <el-form-item label="状态：">
                    <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点ID：">
                    <el-input v-model="form.user_id" placeholder="请输入节点ID"></el-input>
                </el-form-item>
                <el-form-item label="节点所在地：">
                    <el-input v-model="form.user_name" placeholder="请输入节点所在地"></el-input>
                </el-form-item>
            </el-row>
            <el-row type="flex" class="node_row">
                <div class="title">文件：</div>
                <el-form-item label="文件名：">
                    <el-input v-model="form.user_id" placeholder="请输入输入节点包含的文件名称"></el-input>
                </el-form-item>

                <el-form-item label="文件哈希：">
                    <el-input v-model="form.user_id" placeholder="输入节点包含的文件hashid"></el-input>
                </el-form-item>
                <el-form-item label="上传者哈希：">
                    <el-input v-model="form.user_name" placeholder="输入文件上传者hashid"></el-input>
                </el-form-item>
            </el-row>
            <el-row type="flex" class="node_row">
                <div class="title">其他：</div>
                <el-form-item label="节点上线日期：" style="width:500px;">
                    <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="onSumit()">搜索</el-button>
                </el-form-item>

            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="6">
                <el-button type="primary" @click="openConsole">控制台</el-button>
                <el-button type="primary" @click="goLink">操作日志</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>

            <!-- <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col> -->
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar id="rebateSetTable" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    <el-dialog :visible.sync="newdialogReleaseState" class="my_dialog_node">
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableDataActive" :rowHeader="rowHeader1" :tableOption="tableOption" :operatingStatus="operatingStatus1"></tableBar>
            </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:10px;">
            <el-col :span="6">
                <pageNation :pager="pagerActive" @handleSizeChange="handleSizeChange1" @handleCurrentChange="handleCurrentChange1" class="monitorDetails-page"></pageNation>
            </el-col>
        </el-row>
    </el-dialog>
    <el-dialog :visible.sync="nodeConsole" class="my_dialog_shade" :show-close="false">
        <div class="row_active row_active_node">
            <div class="node_send">
                <div class="nodeShade" v-for="(item,index) in dataActive" v-bind:key="index">
                    <!-- <div class="item_l">##IPFSCONSOLE>:</div><input type="text"  v-model="dataActive[index].value" v-on:keyup.enter="submit(index)"> -->
                    <div class="item_l">##IPFSCONSOLE>:</div><input type="text" class="border-input"  v-model="dataActive[index].value" v-on:keyup.enter="submit($event,index)">
                </div>
            </div>
            <div class="node_result">
                <div class="nodeShade" v-for="(item,index) in dataResult" v-bind:key="index">
                    <div class="item_l">{{dataResult[index].title}}</div>
                    <div>{{dataResult[index].value}}</div>
                </div>
            </div>
        </div>

    </el-dialog>

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import tableBarActive1 from "../../components/tableBarActive1";

import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
    send_ptfs_cmd,
    query_ptfs_cmd_result
} from "../../api/api.js";
import common from "../../common/js/util.js"

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data() {
        return {
            newdialogReleaseState: false,
            operatingStatus: true,
            clomnSelection: true,
            nodeConsole: false,
            value1: "",
            value2: "",
            dataActive: [{
                    value: "",
                },

            ],
            dataResult: [],
            options: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '正常'
                },
                {
                    value: '2',
                    label: '冻结'
                },
            ],
            options1: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '2',
                    label: '是'
                },
                {
                    value: '1',
                    label: '否'
                },
            ],
            options2: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '男'
                },
                {
                    value: '2',
                    label: '女'
                },
                {
                    value: '3',
                    label: '未知'
                },
            ],
            form: {
                user_id: "",
                user_name: "",
                tel_num: "",
                sex: "全部",
                account_status: 0,
                statusText: "全部",
                statusActiveText: "全部",

                active_status: 0,
                reg_start_time: 0,
                reg_end_time: 0,
                bind_start_time: 0,
                bind_end_time: 0
            },
            user_form: {
                normal_num: "",
                active_num: "",
                total_num: ""
            },

            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "user_id",
                    label: "节点ID"
                },
                {
                    prop: "user_name",
                    label: "节点类型"
                },
                {
                    prop: "user_tel",
                    label: "节点状态"
                },
                {
                    prop: "sex",
                    label: "分区"
                },
                {
                    prop: "status",
                    label: "分组"
                },
                {
                    prop: "active_status",
                    label: "节点IP"
                },
                {
                    prop: "first_reg_time",
                    label: "节点所在地"
                },
                {
                    prop: "first_bind_time",
                    label: "占用空间/总空间"
                }
            ],
            rowHeader1: [
                // 未做任何格式化处理的数据
                {
                    prop: "time_stamp",
                    label: "文件名"
                },
                {
                    prop: "dev_sn",
                    label: "文件类型"
                },
                {
                    prop: "node_id",
                    label: "文件大小",
                },
                {
                    prop: "cpu_tem",
                    label: "上传时间"
                },
                {
                    prop: "mb_tem",
                    label: "文件哈希",
                },
                {
                    prop: "hd_tem",
                    label: "上传者哈希"
                },

            ],
            tableData: [{
                    "user_id": 123,
                    "user_name": "超级管理节点",
                    "user_tel": "在线",
                    "sex": "A区",
                    "status": "A组",
                    "active_status": "192.168.0.12",
                    "first_reg_time": "武汉哦",
                    "first_bind_time": "123gb/138gb",
                },
                {
                    "user_id": 123,
                    "user_name": "超级管理节点",
                    "user_tel": "在线",
                    "sex": "A区",
                    "status": "A组",
                    "active_status": "192.168.0.12",
                    "first_reg_time": "武汉哦",
                    "first_bind_time": "123gb/138gb",
                },
                {
                    "user_id": 123,
                    "user_name": "超级管理节点",
                    "user_tel": "在线",
                    "sex": "A区",
                    "status": "A组",
                    "active_status": "192.168.0.12",
                    "first_reg_time": "武汉哦",
                    "first_bind_time": "123gb/138gb",
                }
            ],
            tableOption: {
                label: "操作",
                options: [{
                    label: "文件详情",
                    type: "primary",
                    methods: "getInfo"
                }, ]
            },
            pager: {
                count: 400,
                page: 1,
                rows: 100
            },
            pagerActive: {
                count: 0,
                page: 1,
                rows: 10
            },

            dataResName: "注册日期",
            dataBindName: "首次绑定日期",

            showState: false,
            datapickeResValue: [
                new Date(1800, 10, 10, 10, 10),
                new Date(1900, 10, 11, 10, 10)
            ],
            datapickerBindValue: [
                new Date(2000, 10, 10, 10, 10),
                new Date(2100, 10, 11, 10, 10)
            ],
            dropdownArr: [{
                    name: "批量冻结",
                    value: "1"
                },
                {
                    name: "批量解冻",
                    value: "2"
                }
            ],
            alertNum: 0,
            dataNum: "8888",
            query_type: 0,
            user_status: 0,
            active_status: 0,
            idArr: [],
            timerStatus: false,
            timer1: null,
            task_id: ""

        };
    },
    mounted: function () {

    },
    methods: {
        //详情弹窗
        handleButton(val) {
            this.newdialogReleaseState = true
            if (val.methods == "getInfo") {}
        },
        goLink() {
            this.$router.push({
                path: "/consolelog"
            })
        },
        timer1() {
            console.log("time");
        },
        submit(el,index) {
             
            let snode_hash = ""
            let target_node = ""
            let cmd_data = ""
            let tempStr = this.dataActive[index].value
            let tempStrActice = tempStr.split("|")
            if (tempStrActice.length == 2) {
                cmd_data = tempStrActice[0].trim()
                snode_hash = tempStrActice[1].trim()
                target_node = ""
            } else if (tempStrActice.length == 1) {
                cmd_data = tempStrActice[0].trim()
                snode_hash = " "
                target_node = " "
            } else if (tempStrActice.length >= 3) {
                cmd_data = tempStrActice[0].trim()
                snode_hash = tempStrActice[1].trim()
                target_node = tempStrActice[2].trim()
            }
            console.log(cmd_data + "*" + snode_hash + "*" + target_node)
            if (this.dataActive[index].value == "quit") {
                this.nodeConsole = false
                clearInterval(this.timer1)
                this.timer1 = null
            } else {
                this.dataActive.push({
                    value: ""
                })
                // this.dataResult.push({
                //     value: ",asdsadsa sadsadsadsa asdasdsadsadsdsadsadsadsadsadsadasdsadsda"

                // })
                let param = new Object()
                param.snode_hash = snode_hash,
                    param.cmd_type = 0
                param.target_node = target_node
                param.cmd_data = cmd_data
                param.cmd_desc = ""
                //  let _this=this
                send_ptfs_cmd(param).then(res => {
                    if (res.status == 0 && res.data.cmd_state != 6) {
                        this.task_id = res.data.task_id

                        // this.query_ptfs_cmd_result(param1)
                        this.timer1 = setInterval(this.queryinfo, 5000)
                    }

                }).catch(error => {
                    console.log(error)

                })

            }
              var dom = document.getElementsByClassName("border-input"),
                    currInput = dom[index],
                    nextInput = dom[index + 1],
                    lastInput = dom[index - 1];
                /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
                if (el.keyCode != 8) {
                    if (index < (this.dataActive.length - 1)) {
                        nextInput.focus();
                    } else {
                        currInput.blur();
                    }
                }else{
                    if (index !=0) {
                        lastInput.focus();
                    }
                }

        },

        queryinfo() {
            let param1 = new Object()
            param1.task_id = this.task_id
            query_ptfs_cmd_result(param1).then(res => {
                if (res.status == 0 && (res.data.cmd_state != 6 || res.data.cmd_state != 4)) {
                    clearInterval(this.timer1)
                    this.timer1 = null
                    this.dataResult.push({
                        value: res.data.cmd_result,
                        title: "##IPFSCONSOLE>返回结果:"

                    })
                } else {
                    this.dataResult.push({
                        value: res.data.cmd_result,
                        title: "##IPFSCONSOLE>返回结果:"

                    })
                }
            }).catch(error => {

            })
        },
        openConsole() {
            this.nodeConsole = true
            this.dataActive = [{
                value: ""
            }]
            this.dataResult = [{
                value: ""
            }]

        }

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
        myDatanums: myDatanums,
        tableBarActive1: tableBarActive1
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

        &.device_form_active {
            .el-form-item__content {
                width: 300px;
            }
        }

        .node_row {
            margin-top: 10px;

            .el-select {
                width: 300px;
            }
        }

        .node_title {
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #000;
            font-size: 14px;
            font-weight: bold;

        }

        .title {
            height: 40px;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0099cc;
            font-weight: bold;
        }

        .el-form-item__label {
            white-space: nowrap;
            width: 90px;
            text-align: left;
        }

        .el-form-item {
            margin-bottom: 0px;
            margin-left: 20px !important;
            margin-top: 0px !important;
        }

        .row_activess {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
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
}

.myself-container .my_dialog_node .el-dialog {
    width: 50%
}

.myself-container .my_dialog_shade .el-dialog {
    width: 50%
}

.nodeShade {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 5px;

    input {
        border: none;
        outline: none;
        width: 700px;
        display: flex;
        align-items: center;
        padding: 0px 20px;

    }
}

.row_active_node {
    max-height: 500px;
    overflow-y: auto;

    .node_send {
        min-height: 250px;
    }

    .node_result {
        width: 100%;
        min-height: 200px;
        border-top: 1px solid #999999;

        .nodeShade {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 5px;

            .nodeShade:nth-child(1) {
                display: none
            }

            input {
                border: none;
                outline: none;
                width: 700px;
                display: flex;
                align-items: center;
                padding: 0px 20px;

            }
        }
    }
}
</style>
