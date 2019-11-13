<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex" class="row_active row_activess">
                <el-form-item label="文件名称">
                    <el-input v-model="form.name" placeholder="请输入文件名称"></el-input>
                </el-form-item>
                <el-form-item label="设备SN">
                    <el-input v-model="form.dev_sn" placeholder="请输入设备SN"></el-input>
                </el-form-item>
                <el-form-item label="渠道">
                    <el-input v-model="form.appid" placeholder="请输入渠道"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="form.area" placeholder="请输入地区"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.start_time" :clearable="false" value-format="timestamp" @change="onChangeStartTime" type="datetime" placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.end_time" :clearable="false" value-format="timestamp" type="datetime" @change="onChangeEndTime" placeholder="选择结束日期">
                    </el-date-picker>
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
        <el-row type="flex" class="row_active" justify="space-between" style=" justify-content: flex-end;">
            <!-- <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col> -->
            <el-col :span="1" type="flex" style="margin-right:10px;">
                <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
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
import tableBarActive2 from "../../components/tableBarActive2";
import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
    file_dlinfo
} from "../../api/api.js";
import common from "../../common/js/util.js"
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            operatingStatus: false,
            operatingStatus1: false,
            reserveselection: true,
            monitorDetails: false,
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "name",
                    label: "文件名称",
                },
                
                {
                    prop: "file_size",
                    label: "文件大小",
                },
                {
                    prop: "upsize",
                    label: "上传流量",
                },
                {
                    prop: "start_time",
                    label: "上传开始时间",
                },
                {
                    prop: "end_time",
                    label: "上传结束时间",
                },
                {
                    prop: "app_id",
                    label: "下载渠道",
                },
                {
                    prop: "usr_id",
                    label: "下载用户",
                    width: 100,
                },
                {
                    prop: "dl_area",
                    label: "下载地区"
                },
                {
                    prop: "up_speed",
                    label: "平均上传速度"
                },
                {
                    prop: "down_speed",
                    label: "平均下载速度"
                },
                {
                    prop: "dev_sn",
                    label: "上传设备SN"
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
                name: "",
                area: "",
                dev_sn: "",
                appid: "",
                start_time: "",
                end_time: "",
                value1: "",
                value2: ""
            },
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: true,
            push_key: "",
            options: [{
                    value: '0',
                    label: '首次'
                },
                {
                    value: '1',
                    label: '备份'
                },
            ],
            idArr: [],
            multipleSelectionAll: [], // 所有选中的数据包含跨页数据
            multipleSelection: [], // 当前页选中的数据
            idKey: 'usr_id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
            tableRef: "table",
            dataAll: [],
            dataPage: [],
            idArrss: [],
            idArrssStatus: false,
            pageSelectedArr: {},
            batchId: [],
            exportArr: []

        };
    },
    mounted: function () {

        this.push_key = this.$route.query.push_key
        this.dataNum = this.tableData.length;
        let nowTimes = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);

        let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000);
        let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000);
        this.end_time = Math.round(nowTimes.getTime() / 1000),
            this.end_time_active = Math.round(nowTimes.getTime() / 1000),
            this.start_time = Math.round(befDate.getTime() / 1000),
            this.start_time_active = Math.round(befDateActive.getTime() / 1000),
            this.queryInfo()
    },
    methods: {
        exportExcel() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../excel/Export2Excel');
                const tHeader = ["文件名称","文件大小","上传流量","上传开始时间","上传结束时间", "下载渠道","下载用户", "下载地区","平均上传速度", "平均下载速度","上传设备SN"];
                // 上面设置Excel的表格第一行的标题
                const filterVal = ["name","file_size","upsize","start_time","end_time","app_id", "usr_id","dl_area","up_speed","down_speed", "dev_sn",];
                // 上面的index、nickName、name是tableData里对象的属性
                this.exportArr = []
                for (let i in this.pageSelectedArr) {

                    for (var j = 0; j < this.pageSelectedArr[i].length; j++) {
                        this.exportArr.push(this.pageSelectedArr[i][j])
                    }
                }
                console.log(this.exportArr)
                const list = this.exportArr; //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '列表excel');
            })
        },

        selectCheckBox(args) {
            let pageSelected = []
            for (let i = 0; i < args.a.length; i++) {
                pageSelected.push(args.a[i])
            }
            this.pageSelectedArr[this.pager.page] = pageSelected

        },
        selectAll(a) {
            if (a.length > 0) {
                let pageSelected = []
                for (let i = 0; i < a.length; i++) {
                    pageSelected.push(a[i])
                }
                this.pageSelectedArr[this.pager.page] = pageSelected

            } else {
                let pageSelected = []
                this.pageSelectedArr[this.pager.page] = pageSelected
            }

        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 设置选中的方法
        setSelectRow() {
            if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
                return;
            }
            // 标识当前行的唯一键的名称
            let idKey = this.idKey;
            let selectAllIds = [];
            let that = this;
            this.multipleSelectionAll.forEach(row => {
                selectAllIds.push(row[idKey]);
            })
            this.$refs.table1.clearSelection();
            for (var i = 0; i < this.tableData.length; i++) {
                if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
                    // 设置选中，记住table组件需要使用ref="table"
                    this.$refs.table1.toggleRowSelection(this.tableData[i], true);
                }
            }
        },
        onChange(item) {
            this.form.alarm_type = item
        },
        onChangeActive(item) {
            this.alarm_status = item
        },

        handleSelectionChange(val) {
                        this.multipleSelection = val;

            this.alertNum = val.length
        },
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);

            this.pager.page = val.val
            this.queryInfo()

        },
        handleCurrentChange1(val) {
            this.pagerActive.page = val.val
            this.queryDevInfo()

        },
        getInfo() {
            this.queryInfo()

        },

        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            param.name = this.form.name
            param.dev_sn = this.form.dev_sn
            param.appid = this.form.appid
            param.area = this.form.area
            if (this.form.start_time == "") {
                param.start = this.form.start_time
            } else {

                param.start = (this.form.start_time) / 1000
            }
            if (this.form.end_time == "") {
                param.end = this.form.end_time
            } else {
                param.end = (this.form.end_time) / 1000
            }
            param.page = this.pager.page - 1,
                file_dlinfo(param)
                .then(res => {
                    if (res.status == 0) {
                        console.log(res)
                        if (res.data.result) {
                            this.pager.count = res.data.total
                            this.dataNum = res.data.total
                            let nowArr = res.data.result
                            for (var i = 0; i < nowArr.length; i++) {
                                nowArr[i].start_time = this.common.getTimes((nowArr[i].start_time) * 1000)
                                nowArr[i].end_time = this.common.getTimes((nowArr[i].end_time) * 1000)
                                nowArr[i].upsize = this.common.formatByteActive(nowArr[i].upsize)
                                nowArr[i].file_size = this.common.formatByteActive(nowArr[i].file_size)
                                nowArr[i].up_speed = (this.common.formatByteActive(nowArr[i].up_speed)) + "/s"
                                nowArr[i].down_speed = (this.common.formatByteActive(nowArr[i].down_speed)) + "/s"

                            }

                            this.tableData = nowArr
                            setTimeout(() => {
                                this.setSelectRow();
                            }, 200)

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
        tableBarActive2: tableBarActive2,
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

            &.row_activess {
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
