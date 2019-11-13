<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active row_active3">

                <el-form-item label="渠道名称">
                    <el-input v-model="form.app_name" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
                <el-form-item label="统计日期">
                    <el-date-picker v-model="form.timeValue" type="datetime" @change="getSTimeendBlackList" placeholder="选择日期时间">
                    </el-date-picker>
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
                <tableBar id="rebateSetTable3" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    query_3rd_capacity_stream_details
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
            timeValue: "",
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "timestamp",
                    label: "统计日期",
                    width: 150,
                },
                {
                    prop: "app_name",
                    label: "渠道名称",
                },
                {
                    prop: "store_usage",
                    label: "当日存储容量",
                },
                {
                    prop: "store_backup_usage",
                    label: "当日备份存储容量",
                },
                {
                    prop: "store_file_cnt",
                    label: "当日存储文件数量",
                },
                {
                    prop: "backup_file_cnt",
                    label: "当日备份文件数量",
                },
                {
                    prop: "stream_fetch_size",
                    label: "当日下载流量",

                },
                {
                    prop: "fetch_file_cnt",
                    label: "累计下当日下载文件数量"
                },
                {
                    prop: "fetch_times",
                    label: "当日下载次数"
                },
                {
                    prop: "fetch_user_cnt",
                    label: "单日下载用户"
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
                app_name: "",
                timeValue: ""

            },
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: false,

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
            timestamp: "",

        };
    },
    mounted: function () {
        this.timestamp = (new Date(new Date().toLocaleDateString()).getTime() - 1 * 60 * 60 * 24) / 1000
        this.queryInfo()

    },
    methods: {
        getInfo() {
            this.queryInfo()
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
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.token = ""
            if (this.form.timeValue == "") {
                param.timestamp = parseInt(this.timestamp)
            } else {
                param.timestamp = (this.form.timeValue.getTime() / 1000)
            }

            param.page_no = this.pager.page - 1
            if (this.form.app_name == "") {
                param.app_name = "*"

            } else {
                param.app_name = this.form.app_name
            }

            param.page_size = 10
            query_3rd_capacity_stream_details(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data.third_app_stream_cap_details) {
                            this.pager.count = res.data.total_cnt
                            this.dataNum = res.data.total_cnt
                            let nowArr = res.data.third_app_stream_cap_details
                           
                              this.tableData = []
                            for (var i = 0; i < nowArr.length; i++) {
                       
                                nowArr[i].timestamp = this.common.getTimes((nowArr[i].timestamp) * 1000)
                                nowArr[i].valid_stream = this.common.getTimes((nowArr[i].valid_stream) * 1000)
                                nowArr[i].valid_updu = this.common.getTimes((nowArr[i].valid_updu) * 1000)
                                 nowArr[i].store_usage = this.common.formatByteActive(nowArr[i].store_usage)
                                 nowArr[i].store_backup_usage = this.common.formatByteActive(nowArr[i].store_backup_usage)
                                 nowArr[i].stream_fetch_size = this.common.formatByteActive(nowArr[i].stream_fetch_size)
                                 
                            }
                         
                              this.tableData =nowArr
                           
                        } else {
                            this.tableData = []
                        }

                    } else {
                        this.$message({
                            message: "没有该渠道数据",
                            type: "info"
                        })
                          this.tableData = []
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
            let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable3'));
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

            &.row_active3 {
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
