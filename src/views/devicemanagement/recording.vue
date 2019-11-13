<template>
<section class="myself-container">
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar :tableData="tableData" :clomnSelection="clomnSelection" :operatingStatus="operatingStatus" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar>
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
import { actionlog } from "../../api/api.js";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            rowHeader: [
                // 未做任何格式化处理的数据
            
                {
                    prop: "action",
                    label: "操作选项"
                },
                {
                    prop: "description",
                    label: "操作版本描述"
                },
                {
                    prop: "time_create",
                    label: "删除时间"
                },
                {
                    prop: "username",
                    label: "操作用户"
                },


            ],
            tableData: [],
            tableOption: {
                
            },
            pager: {
                count: "",
                page: 1,
                rows: 10
            },
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: false,
            operatingStatus:false
        };
    },
    mounted: function () {
        this.dataNum = this.tableData.length;
        this.queryInfo();

  

    },
    methods: {
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                this.$router.push({
                    path: "/deviceinformation",
                    query: {
                        push_key: val.row.push_key
                    }
                })

            }
        },
        handleSelectionChange(val) {
            this.alertNum = val.length
        },
        handleSizeChange(val) {
            //this.pager.page=val

        },
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryInfo()
        },
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.page = this.pager.page - 1
            actionlog(param)
                .then(res => {
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength

                        for (var i = 0; i < nowarractive.length; i++) {
                            nowarractive[i].time_create = this.common.getTimes(parseInt(nowarractive[i].time_create * 1000))

                        }
                        this.tableData = nowarractive
                        console.log(this.tableData)
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

            textarea {
                width: 255px;
                padding: 5px 5px;
                font-family: "微软雅黑";

                height: 60px;
                border: 1px solid #999999;
                border-radius: 5px;
                resize: none
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

.myself-container .my_dialog_set .el-dialog {
    width: 23%;
}
</style>
