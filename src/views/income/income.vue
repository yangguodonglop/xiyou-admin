<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-row>
                        <el-col :span="6">
                            <div class="new_cont new_cont_active1" style="width:100%;">
                                <div class="item_one">总收益</div>
                                <div class="item_two">{{user_form.total_profit}}</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="new_cont new_cont_active2" style="width:100%;">
                                <div class="item_one">总提现</div>
                                <div class="item_two">{{user_form.total_amount}}</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="new_cont new_cont_active3" style="width:100%;">
                                <div class="item_one">本日收益</div>
                                <div class="item_two">{{user_form.yes_amount}}</div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="new_cont new_cont_active4" style="width:100%;">
                                <div class="item_one">本日提现</div>
                                <div class="item_two">{{user_form.yes_profit}}</div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-col>
        </el-row>
    </div>
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <el-form-item label="ID">
                    <el-input v-model="form.user_id" placeholder="请输入ID"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.user_name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.tel_num" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="日期区间">
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
        <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    ptfs_total_profit_info,
    ptfs_query_user_profit_info
} from "../../api/api.js";
import common from "../../common/js/util.js"
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {

            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "user_id",
                    label: "用户ID"
                },
                {
                    prop: "user_name",
                    label: "用户姓名"
                },
                {
                    prop: "user_tel",
                    label: "手机号"
                },
                {
                    prop: "date_stamp",
                    label: "日期"
                },
                {
                    prop: "user_total_profit",
                    label: "收益"
                },
                {
                    prop: "deal_amount",
                    label: "提现"
                },
            ],
            user_form: {
                total_profit: "",
                total_amount: "",
                total_num: ""
            },
            tableData: [],

            tableOption: {
                label: "操作",
                width: 250,
                options: [{
                        label: "刷新",
                        type: "primary",
                        methods: "editOnchange"
                    },
                    {
                        label: "历史记录",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                ]
            },
            pager: {
                count: 40,
                page: 1,
                rows: 10
            },
            form: {
                user_id: "",
                user_name: "",
                tel_num: ""
            },
            value1: "",
            value2: "",
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: true,
            push_key: ""
        };
    },
    mounted: function () {
        this.queryUsersTotal()
        this.queryUserList()
    },
    methods: {
        onSumit() {
            this.queryUserList()

        },
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                //alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                //alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },

        handleCurrentChange(val) {

            this.pager.page = val.val
            this.queryUserList()
        },

        getInfo() {
            this.queryUserList()
        },
        //查询发布版本历史信息
        queryUsersTotal() {
            let param = new Object()
            ptfs_total_profit_info(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data) {
                            this.user_form.total_profit = ((res.data.total_profit) / 1000000).toFixed(4)
                            this.user_form.total_amount = (res.data.total_amount) / 1000000
                            this.user_form.yes_amount = (res.data.yes_amount) / 1000000
                            this.user_form.yes_profit = (res.data.yes_profit) / 1000000

                            console.log(res)
                        } else {

                        }

                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        queryUserList() {
            console.log(this.value1[0])
            let param = new Object()
            //param.query_type = this.query_type,
            if (this.form.user_id == "") {
                param.user_id = 0
            } else {
                param.user_id = parseInt(this.form.user_id)
            }
            param.user_name = this.form.user_name
            param.tel_num = this.form.tel_num

            param.cur_page = this.pager.page - 1

            if (this.value1[0] == undefined) {
                param.start_time = 0
            } else {
                param.start_time = this.value1[0].getTime() / 1000
            }
            if (this.value1[1] == undefined) {
                param.end_time = 0
            } else {
                alert(this.value1[1].getTime() / 1000)
                param.end_time = this.value1[1].getTime() / 1000
            }

            if (this.form.user_id == "" && this.form.user_name == "" && this.form.tel_num == "") {
                param.query_type = 0
            } else {
                param.query_type = 1
            }
            ptfs_query_user_profit_info(param)
                .then(res => {
                    if (res.status == 0) {
                        if (res.data.profit_list) {
                            let nowArr = res.data.profit_list
                            for (var i = 0; i < nowArr.length; i++) {
                                nowArr[i].date_stamp = this.common.getTimess((nowArr[i].date_stamp) * 1000)

                                if (nowArr[i].user_name === "") {
                                    nowArr[i].user_name = "-"
                                }
                                nowArr[i].user_total_profit=(nowArr[i].user_total_profit)/1000000

                            }
                            this.tableData = nowArr
                            this.pager.count = res.data.total_num
                            this.dataNum = res.data.total_num
                            console.log(this.tableData)
                        } else {
                            this.tableData = []
                        }

                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
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
}
</style>
