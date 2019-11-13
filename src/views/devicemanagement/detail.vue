<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <el-form-item label="设备SN">
                    <el-input v-model="form.dev_sn" placeholder="请输入设备SN1"></el-input>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input v-model="form.user_id" placeholder="请输入用户ID"></el-input>
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
                <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :tableBarActive2="tableBarActive2" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                <!-- <tableBarActive2 id="rebateSetTable2"  :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBarActive2> -->
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
import tableBarActive2 from "../../components/tableBarActive2";
import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
    devicelist,
    ptfs_query_node_info_list,
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
                    label: "设备SN"
                },
                {
                    prop: "time_stamp",
                    label: "日期"
                },
                {
                    prop: "free_cap",
                    label: "当日使用空间/总空间"
                },
                {
                    prop: "up_bandwidth",
                    label: "当日上行带宽"
                },
                {
                    prop: "online_time",
                    label: "在线时长"
                },
                {
                    prop: "m_store",
                    label: "当日存储力"
                },
                {
                    prop: "profit",
                    label: "当日收益"
                },
                {
                    prop: "user_id",
                    label: "绑定用户ID"
                },
            ],
            tableData11: [],
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
                tel_num: "",
                dev_sn: "",
                sex: "全部",
                account_status: 0,
                statusText: "全部",
                statusActiveText: "全部"
            },
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: true,
            push_key: "",
            value1: "",
            idArr: [],
            multipleSelectionAll: [], // 所有选中的数据包含跨页数据
            multipleSelection: [], // 当前页选中的数据
            idKey: 'user_id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
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
        this.queryUserList()
    },
    methods: {
        //导出
        exportExcel() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../excel/Export2Excel');
                const tHeader = ['设备SN', '日期', '当日使用空间/总空间', '当日上行带宽', '在线时长', '当日存储力', '当日收益', '绑定用户ID', ];
                // 上面设置Excel的表格第一行的标题
                const filterVal = ['dev_sn', 'time_stamp', 'free_cap', 'up_bandwidth', 'online_time', 'store', 'profit', 'user_id'];
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
        onSumit() {
            this.queryUserList()
        },
        queryUserList() {
            let param = new Object()

            if (this.form.user_id == "") {
                param.user_id = 0
            } else {
                param.user_id = parseInt(this.form.user_id)
            }
            param.dev_sn = this.form.dev_sn
            param.cur_page = this.pager.page - 1
            if (this.value1[0] == undefined) {
                param.start_time = 0
            } else {
                param.start_time = this.value1[0].getTime() / 1000
            }
            if (this.value1[1] == undefined) {
                param.end_time = 0
            } else {
                param.end_time = this.value1[1].getTime() / 1000
            }

            if (this.form.dev_sn == "" && this.form.user_id == "" && this.form.tel_num == "") {
                param.query_type = 0
            } else {
                param.query_type = 1
            }
            ptfs_query_node_info_list(param)
                .then(res => {
              
                    if (res != null) {
                        if (res.status == 0) {
                            if (res.data.profit_detail_list) {
                                let nowArr = res.data.profit_detail_list
                                for (var i = 0; i < nowArr.length; i++) {
                                    nowArr[i].time_stamp = this.common.getTimess((nowArr[i].time_stamp) * 1000)
                                    nowArr[i].valid_updu = this.common.getTimes((nowArr[i].valid_updu) * 1000)
                                    nowArr[i].store_usage = this.common.formatByteActive(nowArr[i].store_usage)
                                    nowArr[i].up_bandwidth = this.common.formatByteActive(nowArr[i].up_bandwidth) + "/s"
                                    nowArr[i].online_time = this.common.formatDays((nowArr[i].online_time * 1000))
                                    nowArr[i].free_cap = this.common.formatByteActive(nowArr[i].free_cap) + "/" + this.common.formatByteActive(nowArr[i].total_cap)
                                    nowArr[i].profit = ((nowArr[i].profit)/1000000).toFixed(6)
                                    nowArr[i].m_store = ((nowArr[i].m_store)/1000000).toFixed(6) +"s/d"

                                }
                                this.tableData = nowArr
                                this.pager.count = res.data.total_num
                                this.dataNum = res.data.total_num
                                setTimeout(() => {
                                    this.setSelectRow();
                                }, 200)
                                // console.log(res.data.user_info_list)
                            } else {
                                this.tableData = []
                            }

                        } else {
                          
                            this.$message({
                                message: `${res.err_msg}`,
                                type: "error"
                            })
                        }

                    } else {

                        this.$message({
                            message: "暂无返回数据！",
                            type: "info"
                        })

                    }

                })
                .catch(error => {
                    console.log(error)
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                //alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                //alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // alert(val.length)
            // this.alertNum = val.length
            // alert(JSON.stringify(val))
        },

        handleCurrentChange(val) {
            this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);

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
            if (this.alertNum == 0) {
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                });
            } else {
                alert('click on item *' + command);
            }

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
        tableBarActive2: tableBarActive2
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
