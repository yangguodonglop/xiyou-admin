<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-row>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active1" style="width:100%;">
                                <div class="item_one">总存储力</div>
                                <div class="item_two">{{user_form.total_store}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active2" style="width:100%;">
                                <div class="item_one">西柚机总数</div>
                                <div class="item_two">{{user_form.total_num}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active3" style="width:100%;">
                                <div class="item_one">累计收益</div>
                                <div class="item_two">{{user_form.total_profit}}</div>
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

                <el-form-item label="">
                    <el-button type="primary" @click="onSumit()">搜索</el-button>
                </el-form-item>

            </el-row>

        </el-form>
    </div>
    <div class="devide_table">

        <!-- <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
            <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row> -->
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    ptfs_query_user_store_list

} from "../../api/api.js";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            user_form: {
                total_store: "",
                active_num: "",
                total_num: "",
                
            },

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
                    prop: "sum_store",
                    label: "总存储力"
                },
                {
                    prop: "dev_num",
                    label: "西游机总数"
                },
                {
                    prop: "sum_profit",
                    label: "累计收益"
                },

            ],
            form: {
                user_id: "",
                user_name: "",
                tel_num: "",
                sex: "全部",
                account_status: 0,
                statusText: "全部",
                statusActiveText: "全部"
            },
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "详情",
                        type: "primary",
                        methods: "editOnchange"
                    },

                ]
            },
            pager: {
                count: 400,
                page: 1,
                rows: 100
            },
            alertNum: 0,
            dataNum: "8888"
        };
    },
    mounted: function () {
        this.dataNum = this.tableData.length
        this.queryProfitInfo()
        this.queryUserList()
    },
    methods: {
        onSumit() {
            this.queryUserList()
        },
        queryProfitInfo() {
            let param = new Object()
            ptfs_total_profit_info(param)
                .then(res => {
                    if(res!=null){
                          if (res.status == 0 && res.err_code == 0) {
                        if (res.data) {
                            this.user_form.total_store = ((res.data.total_store) / 1000000).toFixed(4)
                            this.user_form.total_num = res.data.total_num
                            this.user_form.total_profit = ((res.data.total_profit) / 1000000).toFixed(2)

                        } else {

                        }

                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    }

                    }
                    else{
                         this.$message({
                            message: "暂无返回数据！",
                            type: "info"
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
            let param = new Object()
            if (this.form.user_id == "") {
                param.user_id = 0
            } else {
                param.user_id = parseInt(this.form.user_id)
            }
            param.user_name = this.form.user_name
            param.tel_num = this.form.tel_num
            param.cur_page = this.pager.page - 1

            if (this.form.user_id == "" && this.form.user_name == "" && this.form.tel_num == "") {
                param.query_type = 0
            } else {
                param.query_type = 1
            }
            ptfs_query_user_store_list(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data.store_list) {
                            let nowArr = res.data.store_list
                            for (var i = 0; i < nowArr.length; i++) {
                           
                                if (nowArr[i].user_name === "") {
                                    nowArr[i].user_name = "-"
                                }
                                nowArr[i].sum_store=(nowArr[i].sum_store)/1000000
                                nowArr[i].sum_profit=(nowArr[i].sum_profit)/1000000
                        
                            }
                            this.tableData = nowArr
                            this.pager.count = res.data.total_num
                            this.dataNum = res.data.total_num
                            console.log(res.data.user_info_list)
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
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },
        handleSelectionChange(val) {
            alert(val.length)
            this.alertNum = val.length
            alert(JSON.stringify(val))
        },
        handleSizeChange(val) {
            alert("每页" + "***" + val.val + "条");
        },
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryUserList()
        },
        getInfo() {
            alert(JSON.stringify(this.selectedValue));
        },
        change(val) {
            alert(val + "****");
        },
        getShow() {
            this.showState = !this.showState;
        },
        handleCommand(command) {
            alert('click on item *' + command);
        },
        exportExcel() {
           
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
