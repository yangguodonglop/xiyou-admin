<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active row_active_monitor">

                <el-form-item label="渠道名称">
                    <el-input v-model="form.app_id" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-button type="primary" @click="getInfo()" style="margin-left:30px;">查询</el-button>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
         <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>

            <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar  id="rebateSetTable4" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    query_3rd_capacity_stream_overview
} from "../../api/api.js";
import common from "../../common/js/util.js"
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data() {
        return {
            operatingStatus: false,
            operatingStatus1: false,
            monitorDetails: false,
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "app_id",
                    label: "渠道名称",
                    width: 150,
                },
                {
                    prop: "store_usage",
                    label: "累计存储容量",
                },
                {
                    prop: "store_backup_usage",
                    label: "备份存储容量",
                },
                {
                    prop: "store_file_cnt",
                    label: "累计存储文件数量",
                },
                {
                    prop: "backup_file_cnt",
                    label: "备份文件数量",
                },
                {
                    prop: "stream_fetch_size",
                    label: "累计下载流量",
                },
                {
                    prop: "fetch_file_cnt",
                    label: "累计下载文件数量",

                },
                {
                    prop: "fetch_times",
                    label: "累计下载次数"
                },
                {
                    prop: "fetch_user_cnt",
                    label: "累计下载用户数"
                },

            ],
            tableData: [],
            dev_sn: '',
            pager: {
                count: 0,
                page: 0,
                rows: 10
            },
            form: {
                app_id: "",

            },
            showState: false,
            alertNum: 0,
            dataNum: "",
            clomnSelection: false,

        };
    },
    mounted: function () {
        this.queryInfo()
    },
    methods: {

        handleSelectionChange(val) {
            this.alertNum = val.length
        },
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryInfo()

        },
        getInfo() {
            this.queryInfo()
        },

        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.token = ""
            param.file_name = ""
            if (this.$route.query.data != undefined && this.form.app_id == "") {
                if (this.$route.query.data == "全部") {
                    param.app_id = "*"
                } else {
                    param.app_id = this.$route.query.data
                }
            } else {
                if (this.form.app_id == "") {
                    param.app_id = "*"

                } else {
                    param.app_id = this.form.app_id
                }

            }

            param.page_no = this.pager.page - 1,
                param.dev_sn = "*"
            param.page_size = 10

            query_3rd_capacity_stream_overview(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        console.log(res.data)
                        if (res.data.third_app_stream_cap_overview) {
                            this.pager.count = res.data.total_cnt
                            this.dataNum = res.data.total_cnt
                            let nowArr = res.data.third_app_stream_cap_overview
                           
                          
                            for (var i = 0; i < nowArr.length; i++) {
                                nowArr[i].valid_stream = this.common.getTimes((nowArr[i].valid_stream) * 1000)
                                nowArr[i].valid_updu = this.common.getTimes((nowArr[i].valid_updu) * 1000)
                                 nowArr[i].store_usage = this.common.formatByteActive(nowArr[i].store_usage)
                                 nowArr[i].store_backup_usage = this.common.formatByteActive(nowArr[i].store_backup_usage)
                                 nowArr[i].stream_fetch_size = this.common.formatByteActive(nowArr[i].stream_fetch_size)
                                 
                            }
                              this.tableData =nowArr
                           // this.tableData = res.data.third_app_stream_cap_overview

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
             exportExcel() {
            /* generate workbook object from table */
            let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable4'));
            /* get binary string as output */
            let wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(new Blob([wbout], {
                    type: 'application/octet-stream'
                }), '用户提交返利表.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined')
                    console.log(e, wbout)
            }
            return wbout
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

    }

}
</style>
