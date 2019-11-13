<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active row_active_monitor">
                <el-form-item label="设备SN">
                    <el-input v-model="form.dev_sn" placeholder="请输入设备SN"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="form.dev_city" placeholder="请输入地区"></el-input>
                </el-form-item>
                <el-form-item label="上传流量区间">
                    <el-input v-model="form.minGb" placeholder="" class="input_active" style="width:80px;"></el-input><span>GB</span><i>--</i>
                    <el-input v-model="form.maxGb" placeholder="" class="input_active" style="width:80px;"></el-input><span>GB</span>
                </el-form-item>
                <el-button type="primary" @click="onSumit()" style="margin-left:30px;">查询</el-button>
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
                <tableBar id="rebateSetTable5" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @handleSelectionChange="handleSelectionChange"></tableBar>
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
    query_device_details
} from "../../api/api.js";
import common from "../../common/js/util.js"
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data() {
        return {
            operatingStatus: false,
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "dev_sn",
                    label: "设备SN",
                    width: 150,
                },
                {
                    prop: "capacity",
                    label: "存储容量",
                    width: 180,
                },
                {
                    prop: "files",
                    label: "存储文件数",
                },
                {
                    prop: "storage_times",
                    label: "存储次数",
                    width: 80,
                },
                {
                    prop: "upload_times",
                    label: "上传次数",
                    width: 180,
                },
                {
                    prop: "upload_traffic",
                    label: "上传流量",
                    width: 100,
                },
                {
                    prop: "channel",
                    label: "上传渠道数",
                    width: 100,
                },
                {
                    prop: "user",
                    label: "上传用户数"
                },
                {
                    prop: "storage_bandwidth",
                    label: "平均存储宽带"
                },
                {
                    prop: "upload_broadband",
                    label: "平均上传宽带"
                },
                {
                    prop: "citys",
                    label: "设备地区"
                },

            ],
            tableData: [],
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
            form: {
                dev_city: "",
                dev_sn: "",
                minGb: "",
                maxGb: "",

            },
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: false,
        };
    },
    mounted: function () {

        this.queryInfo()
    },
    methods: {
        onSumit() {
            if (this.form.minGb == " ") {
                this.form.minGb = -1
            }
            if (this.form.maxGb == " ") {
                this.form.maxGb = -1
            }
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
            param.dev_sn = this.form.dev_sn
            param.dev_city = this.form.dev_city
            if (this.form.minGb == "") {
                param.export_stream_val1 = -1
            } else {
                param.export_stream_val1 = parseInt((this.form.minGb) * 1073741824)
            }
            if (this.form.maxGb == "") {
                param.export_stream_val2 = -1
            } else {
                param.export_stream_val2 = parseInt((this.form.maxGb) * 1073741824)
            }

            param.page_no = this.pager.page - 1,
                param.page_size = 10

            query_device_details(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data.rows) {
                            this.pager.count = res.data.total_cnt
                            this.dataNum = res.data.total_cnt
                            let nowArr = res.data.rows
                            this.tableData = []
                            for (var i = 0; i < nowArr.length; i++) {
                                let nowobj = {
                                    dev_sn: nowArr[i][0],
                                    capacity:this.common.formatByteActive(nowArr[i][1]) ,
                                    files: nowArr[i][2],
                                    storage_times: nowArr[i][3],
                                    upload_times: nowArr[i][4],
                                    upload_traffic: this.common.formatByteActive(nowArr[i][5]),
                                    channel: nowArr[i][6],
                                    user: nowArr[i][7],
                                    storage_bandwidth:this.common.formatByteActive(nowArr[i][8])+"/s",
                                    upload_broadband:this.common.formatByteActive(nowArr[i][9])+"/s" ,
                                    citys: nowArr[i][10]

                                }

                                this.tableData.push(nowobj)
                            }
                            console.log(this.tableData)
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
            let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable5'));
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
                span {
                    float: left;
                    margin-left: 10px;
                }

                i {
                    float: left;
                    margin: 0 10px;
                }

                .input_active {
                    width: 50px;
                    float: left;

                    .el-input__inner {}

                }

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
