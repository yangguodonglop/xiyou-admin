<template>
<section class="myself-container myself-container-nodes">
    <div class="device_form device_form_active">
        <div class="node_title">目标节点筛选</div>
        <el-form ref="form" :model="form">
            <el-row type="flex" class="node_row">
                     <el-form-item label="执行结果：">
                    <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作时间：" style="width:500px;">
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
                <div class="nodes_shade">
                    <div class="item"><div class="item_l">操作时间：</div><div class="item_r">2019-09-27 10:10:08</div></div>
                    <div class="item"><div class="item_l">执行命令：</div><div class="item_r">lock  ipfs</div></div>
                    <div class="item"><div class="item_l">执行结果：</div><div class="item_r">成功</div></div>
                    <div class="item"><div class="item_l">目标清单：</div><div class="item_r">sfsf2408fs09f8491204<br>kdf23498fd90824jdsf09sf9<br>2842442424242424sfsf2<br>408fs09f84912047kdf23<br>498fd90824jdsf09sf9284<br>2442424242424sfsf2408fs09f84912047</div></div>
                    <div class="item"><div class="item_l">返回信息：</div><div class="item_r">90 successful 10 failed</div></div>
                </div>
            </el-col>
        </el-row>

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
    ptfs_query_total_users,
    ptfs_query_user_list,
    ptfs_forbid_users
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
            value1: "",
            value2: "",
            options: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '成功'
                },
                {
                    value: '2',
                    label: '失败'
                },
                  {
                    value: '3',
                    label: '超时'
                },
                  {
                    value: '4',
                    label: '未知'
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
                    label: "序号"
                },
                {
                    prop: "user_name",
                    label: "操作时间"
                },
                {
                    prop: "user_tel",
                    label: "操作命令"
                },
                {
                    prop: "sex",
                    label: "目标节点数"
                },
                {
                    prop: "status",
                    label: "执行结果"
                },
           
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
                    methods: "getInfo",
                }, ]
            },
            pager: {
                count: 10,
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
            idArr: []

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
.myself-container-nodes .nodes_shade{
    width: 100%;
    height: 300px;
    .item{
        width: 100%;
    
        display: flex;
        justify-content: flex-start;
        margin-top: 10px;
        font-size: 14px;
     
        .item_l{
            width: 100px;
            text-align: right;
              display: flex;
              margin-left: 100px;
        align-items: center


        }
    }
 
}
</style>
