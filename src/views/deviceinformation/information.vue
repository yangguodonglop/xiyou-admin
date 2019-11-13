<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-row>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active1" style="width:100%;">
                                <div class="item_one">激活西柚机</div>
                                <div class="item_two">{{user_form.activated_dev_cnt}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active2" style="width:100%;">
                                <div class="item_one">西柚机总数</div>
                                <div class="item_two">{{user_form.total_dev_cnt}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active3" style="width:100%;">
                                <div class="item_one">在线西柚机</div>
                                <div class="item_two">{{user_form.online_dev_cnt}}</div>
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
                <el-form-item label="用户ID">
                    <el-input v-model="form.user_id" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="设备SN">
                    <el-input v-model="form.dev_sn" placeholder="请输入设备SN"></el-input>
                </el-form-item>
                <el-form-item label="节点ID">
                    <el-input v-model="form.node_hash" placeholder="请输入节点ID"></el-input>
                </el-form-item>
                <el-form-item label="在线状态">
                    <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否激活">
                    <el-select v-model="form.statusActiveText" placeholder="请选择" @change="onChange1">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="">
                    <el-button type="primary" @click="onSumit()">搜索</el-button>
                </el-form-item>

            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <!-- <el-row type="flex" class="row_active">
            <el-col :span="6">
                <myDropdown :dropdownArr="dropdownArr" @handleCommand="handleCommand"></myDropdown>
            </el-col>
        </el-row> -->
        <el-row type="flex" class="row_active" justify="space-between"  style=" justify-content: flex-end;">
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
                <!-- <tableBar id="rebateSetTable1" :tableData="tableData" :clomnSelection="clomnSelection" :operatingStatus="operatingStatus" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" @handleSelectionChange="handleSelectionChange"></tableBar> -->
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
    device_cnt_overview

} from "../../api/api.js";
import common from "../../common/js/util.js"
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data() {
        return {
    operatingStatus:true,
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "miner_sn",
                    label: "设备SN"
                },
                {
                    prop: "miner_type",
                    label: "设备型号"
                },
                {
                    prop: "miner_name",
                    label: "设备版本"
                },
                {
                    prop: "miner_mac",
                    label: "MAC地址"
                },
                {
                    prop: "miner_ip",
                    label: "设备IP"
                },
                {
                    prop: "online_state",
                    label: "设备状态"
                },
                {
                    prop: "bind_state",
                    label: "是否激活"
                },
                {
                    prop: "miner_id",
                    label: "节点ID"
                },
                {
                    prop: "bind_user_id",
                    label: "绑定用户ID"
                }
            ],
            tableData: [],
            operatingStatus: true,
            options: [{
                    value: '',
                    label: '全部'
                },
                {
                    value: '1',
                    label: "在线"
                },
                {
                    value: '0',
                    label: '离线'
                },
            ],
            options1: [{
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: "是"
                },
                {
                    value: '1',
                    label: '否'
                },

            ],
            tableOption: {
                label: "操作",
                width: 250,
                options: [{
                        label: "开机",
                        type: "primary",
                        methods: "editOnchange"
                    },
                    {
                        label: "关机",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                    {
                        label: "重启",
                        type: "primary",
                        methods: "deleteOnchange"
                    },
                    {
                        label: "强制解绑",
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

            optionStateArr: ["全部", "是", "否"],
            selectStateName: "是否激活",
            selectStateValue: "全部",

            optionSexArr: ["全部", "男", "女", "未知"],
            selectSexName: "显示性别",
            selectSexValue: "全部",

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
                    name: "批量开机",
                    value: "1"
                },
                {
                    name: "批量关机",
                    value: "2"
                },
                   {
                    name: "批量绑定",
                    value: "3"
                }
            ],
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: true,
            push_key: "",
            user_form: {
                total_dev_cnt: "",
                online_dev_cnt: "",
                activated_dev_cnt: ""
            },
            form: {
                user_id: "",
                user_name: "",
                tel_num: "",
                sex: "全部",
                node_hash: "",
                account_status: 0,
                statusText: "全部",
                statusActiveText: "全部",
                alert: "",
                bind_state: "",
                active_status: 0,
                reg_start_time: 0,
                reg_end_time: 0,
                bind_start_time: 0,
                bind_end_time: 0
            },
            idArr: [],
            multipleSelectionAll: [], // 所有选中的数据包含跨页数据
            multipleSelection: [], // 当前页选中的数据
            idKey: 'miner_id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
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
        this.queryInfo()
        this.queryUsersTotal()
    },
    methods: {
         exportExcel() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../excel/Export2Excel');
                const tHeader = [ "设备SN","设备型号","设备版本","MAC地址","设备IP","设备状态","是否激活","节点ID","绑定用户ID" ];
                // 上面设置Excel的表格第一行的标题
              
                const filterVal = [ "miner_sn","miner_type","miner_name","miner_mac", "miner_ip", "online_state","bind_state", "miner_id",];
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

            this.form.status = parseInt(item)
            if (item == '') {
                this.form.statusText = "全部"
            } else if (item == 1) {
                this.form.statusText = "在线"
            } else if (item == 2) {
                this.form.statusText = "离线"
            }

        },
        onChange1(item) {

            this.form.bind_state = parseInt(item)
            if (item == '') {
                this.form.statusActiveText = "全部"
            } else if (item == 0) {
                this.form.statusActiveText = "是"
            } else if (item == 1) {
                this.form.statusActiveText = "否"
            }

        },
        onSumit() {
            this.pager.page = 1
            this.queryInfo()

        },
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                // alert("此处为解冻方法" + "***" + "解冻id为" + val.row.userId);
            } else {
                // alert("此处为冻结方法" + "***" + "冻结id为" + val.row.userId);
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;

            //  this.alertNum = val.length
        },
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);

            this.pager.page = val.val
            this.queryInfo()
        },
        getInfo() {
            // alert(JSON.stringify(this.selectedValue));
        },
        change(val) {
            // alert(val + "****");
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
                //alert('click on item *' + command);
            }

        },
        getInfo() {
            this.queryInfo()
        },
        queryUsersTotal() {
            let param = new Object()
            device_cnt_overview(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data) {
                            this.user_form.online_dev_cnt = res.data.online_dev_cnt
                            this.user_form.total_dev_cnt = res.data.total_dev_cnt
                            this.user_form.activated_dev_cnt = res.data.activated_dev_cnt

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
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()

            param.push_key = "";

            param.user_id = this.form.user_id;
            param.dev_sn = this.form.dev_sn;
            param.node_hash = this.form.node_hash;
            param.status = this.form.status
            param.bind_state = this.form.bind_state;;

            param.page = this.pager.page - 1
            devicelist(param)
                .then(res => {

                    let {
                        msg,
                        status,
                        data
                    } = res;
                    if (status != 0) {
                        let errorId = res.err_code
                        this.$message({
                            message: `${this.common.getErrorcodeInfo(errorId)}`,
                            type: "error"
                        });

                    } else {
                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength

                        for (var i = 0; i < nowarractive.length; i++) {
                            nowarractive[i].time_create = this.common.getTimes(parseInt(nowarractive[i].time_create * 1000))
                            nowarractive[i].time_update = this.common.getTimes(parseInt(nowarractive[i].time_update * 1000))
                            switch (nowarractive[i].bind_state) {
                                case "0":
                                    nowarractive[i].bind_state = "是"
                                    break;
                                case "1":
                                    nowarractive[i].bind_state = "否"
                                    break;

                            }
                            switch (nowarractive[i].online_state) {
                                case "0":
                                    nowarractive[i].online_state = "离线"
                                    break;
                                case "1":
                                    nowarractive[i].online_state = "在线"
                                    break;

                            }
                        }
                        setTimeout(() => {
                            this.setSelectRow();
                        }, 200)
                        this.tableData = nowarractive

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
