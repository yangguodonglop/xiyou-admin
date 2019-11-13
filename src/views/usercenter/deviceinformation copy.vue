<template>
<section class="myself-container">
    <div class="devide_title">
        <el-row type="flex">
            <el-col :span="24">
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-row>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active1" style="width:100%;">
                                <div class="item_one">激活用户数</div>
                                <div class="item_two">{{user_form.active_num}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active2" style="width:100%;">
                                <div class="item_one">用户总数</div>
                                <div class="item_two">{{user_form.total_num}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active3" style="width:100%;">
                                <div class="item_one">正常用户</div>
                                <div class="item_two">{{user_form.normal_num}}</div>
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
                <el-form-item label="状态">
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
                <el-form-item label="性别">
                    <el-select v-model="form.sex" placeholder="请选择" @change="onChange2">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="onSumit()">搜索</el-button>
                </el-form-item>
                <el-form-item label="">
                    <div @click="getShow()" class="div_show">展开</div>
                </el-form-item>

            </el-row>
            <el-row type="flex" class="row_activess" v-show="showState">
                <el-form-item label="注册日期">
                    <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item label="首次绑定日期">
                    <el-date-picker v-model="value2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>

            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="6">
                <myDropdown :dropdownArr="dropdownArr" @handleCommand="handleCommand"></myDropdown>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active" justify="space-between" style=" justify-content: flex-end;">
            <el-col :span="10">
                <!-- <myAlert :alertNum="alertNum"></myAlert> -->
            </el-col>

            <el-col :span="1" type="flex" style="margin-right:10px;   ">
                <el-button type="primary" @click="exportExcel22">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarActive1 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive1>
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
    ptfs_forbid_users,
    changePageCoreRecordData
} from "../../api/api.js";
import common from "../../common/js/util.js"

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data() {
        return {

            operatingStatus: true,
            clomnSelection: true,
            reserveselection: true,
            value1: "",
            value2: "",
            options: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '正常'
                },
                {
                    value: '2',
                    label: '冻结'
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
                    label: "稀有用户ID"
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
                    prop: "sex",
                    label: "性别"
                },
                {
                    prop: "status",
                    label: "状态"
                },
                {
                    prop: "active_status",
                    label: "是否激活"
                },
                {
                    prop: "first_reg_time",
                    label: "注册日期"
                },
                {
                    prop: "first_bind_time",
                    label: "首次绑定日期"
                }
            ],
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "冻结",
                        type: "primary",
                        methods: "freeze"
                    },
                    {
                        label: "解冻",
                        type: "danger",
                        methods: "thaw"
                    }
                ]
            },
            pager: {
                count: 400,
                page: 1,
                rows: 100
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
        // this.dataNum = this.tableData.length
        this.queryUsersTotal()
        this.queryUserList()
    },
    methods: {
        //导出
        exportExcel22() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../excel/Export2Excel');
                const tHeader = ['序号1', '昵称2', '姓名3', '序号4', '昵称5', '姓名6', '序号7', '昵称8', ];
                // 上面设置Excel的表格第一行的标题
                const filterVal = ['user_id', 'user_name', 'user_tel', 'sex', 'status', 'active_status', 'first_reg_time', 'first_bind_time'];
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

        onChange(item) {

            this.form.account_status = parseInt(item)
            if (item == 0) {
                this.form.statusText = "全部"
            } else if (item == 1) {
                this.form.statusText = "正常"
            } else if (item == 2) {
                this.form.statusText = "冻结"
            }

        },
        onChange1(item) {

            this.form.active_status = parseInt(item)
            if (item == 0) {
                this.form.statusActiveText = "全部"
            } else if (item == 1) {
                this.form.statusActiveText = "否"
            } else if (item == 2) {
                this.form.statusActiveText = "是"
            }

        },
        onChange2(item) {
            console.log(item)
            if (item == 0) {
                this.form.sex = "全部"
            } else if (item == 1) {
                this.form.sex = "男"
            } else if (item == 2) {
                this.form.sex = "女"
            } else if (item == 3) {
                this.form.sex = ""
            }

        },
        onSumit() {
            this.pager.page = 1
            this.queryUserList()
        },
        queryUsersTotal() {
            let param = new Object()
            ptfs_query_total_users(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data) {
                            this.user_form.active_num = res.data.active_num
                            this.user_form.normal_num = res.data.normal_num
                            this.user_form.total_num = res.data.total_num
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

            let param = new Object()
            //param.query_type = this.query_type,
            if (this.form.user_id == "") {
                param.user_id = 0
            } else {
                param.user_id = parseInt(this.form.user_id)
            }
            param.user_name = this.form.user_name
            param.tel_num = this.form.tel_num
            param.account_status = this.form.account_status
            param.account_active = this.form.active_status
            param.sex = this.form.sex
            param.page = this.pager.page - 1

            if (this.value1[0] == undefined) {
                param.reg_start_time = 0
            } else {
                param.reg_start_time = this.value1[0].getTime() / 1000
            }
            if (this.value1[1] == undefined) {
                param.reg_end_time = 0
            } else {
                alert(this.value1[1].getTime() / 1000)
                param.reg_end_time = this.value1[1].getTime() / 1000
            }
            if (this.value2[0] == undefined) {
                param.bind_start_time = 0
            } else {
                param.bind_start_time = this.value2[0].getTime() / 1000
            }
            if (this.value2[1] == undefined) {
                param.bind_end_time = 0
            } else {
                param.bind_end_time = this.value2[1].getTime() / 1000
            }

            if (this.form.user_id == "" && this.form.user_name == "" && this.form.tel_num == "" && this.form.status == 0 && this.form.active_status == 0 && this.sex == "全部" && this.value1[0] == undefined && this.value1[1] == undefined && this.value2[0] == undefined && this.value2[1] == undefined) {
                param.query_type = 0
            } else {
                param.query_type = 1
            }
            ptfs_query_user_list(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data.user_info_list) {
                            let nowArr = res.data.user_info_list
                            for (var i = 0; i < nowArr.length; i++) {

                                if (nowArr[i].first_bind_time == 0) {
                                    nowArr[i].first_bind_time = "-"

                                } else {
                                    nowArr[i].first_bind_time = this.common.getTimes((nowArr[i].first_bind_time) * 1000)

                                }
                                if (nowArr[i].first_reg_time == 0) {
                                    nowArr[i].first_reg_time = "-"

                                } else {
                                    nowArr[i].first_reg_time = this.common.getTimes((nowArr[i].first_reg_time) * 1000)

                                }
                                if (nowArr[i].user_name === "") {
                                    nowArr[i].user_name = "-"
                                }
                                if (nowArr[i].status == 0) {
                                    nowArr[i].status = "正常"
                                } else {
                                    nowArr[i].status = "冻结"
                                }
                                if (nowArr[i].active_status == 0) {
                                    nowArr[i].active_status = "否"
                                } else {
                                    nowArr[i].active_status = "是"
                                }
                                if (nowArr[i].sex === "") {
                                    nowArr[i].sex = "-"
                                }

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

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        toOperating(val) {
            if (val.status == "正常") {
                let param = new Object()
                let usr_id_list = []
                usr_id_list.push(val.user_id)
                param.usr_id_list = usr_id_list
                param.forbid_status = 1
                ptfs_forbid_users(param)
                    .then(res => {
                        if (res.status == 0 && res.err_code == 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            })
                            this.queryUserList()

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

            } else {
                let param = new Object()
                let usr_id_list = []
                usr_id_list.push(val.user_id)
                param.usr_id_list = usr_id_list
                param.forbid_status = 0
                ptfs_forbid_users(param)
                    .then(res => {
                        if (res.status == 0 && res.err_code == 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            })
                            this.queryUserList()

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
            }
        },
        selectCheckBox(args) {
            // debugger
            console.log(this.pager.page)
            let pageSelected = []
            for (let i = 0; i < args.a.length; i++) {
                pageSelected.push(args.a[i])
            }
            this.pageSelectedArr[this.pager.page] = pageSelected
            console.log(this.pageSelectedArr)
            // return ;

            // console.log(args.a)
            // console.log(args.b)
            // const i = this.idArrss.indexOf(args.b.user_id);
            // console.log(i)
            // if (i != -1) {
            //     this.idArrss.splice(i, 1);
            // } else {
            //     this.idArrss.push(args.b.user_id);
            // }
            // for (let i = 0; i < this.idArrss.length; i++) {
            //     const element = this.idArrss[i];
            //     if (element.user_id == b.user_id) {
            //         this.idArrss.splice(i,1);
            //         break;
            //     }else {
            //         this.idArrss.push(b);
            //     }
            // }\
            console.log(this.idArrss)

        },
        selectAll(a) {
            console.log(a)
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
            console.log(this.pageSelectedArr)
          

        },
        handleSelectionChange(val) {
            // debugger;
            this.multipleSelection = val;
            //      const page = this.pager.page;
            //     console.log(this.pager.page)
            // //console.log(a)
            // this.idArrss[page] = val;
            // console.log(this.idArrss)
            // this.dataAll = val
            // this.alertNum = this.multipleSelection.length
            //this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);
            // this.tableDatass = this.multipleSelectionAll

            // let nowArr = []
            // for (var i = 0; i < this.multipleSelectionAll.length; i++) {
            //     nowArr.push(this.multipleSelectionAll[i].user_id)
            // }
            // this.idArr = nowArr
            // console.log(val.length)
            //  for (var i = 0; i < val.length; i++) {
            //     dataAll.push(val[i])
            // }
            //console.log(this.idArr)
            // debugger
            //    alert(this.pager.page)
            //     this.idArrss[this.pager.page] = val;
            //     console.log(this.idArrss)

        },
        handleSizeChange(val) {},
        handleCurrentChange(val) {

            this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);
            //alert(this.pager.page)
            //  alert(val.val)
            this.pager.page = val.val
            this.queryUserList()
            //  console.log(this.multipleSelection)
        },
        getInfo() {},
        change(val) {},
        getShow() {
            this.showState = !this.showState;
        },
        handleCommand(command) {
            this.batchId = []
            console.log(this.pageSelectedArr)
            for (let i in this.pageSelectedArr) {

                for (var j = 0; j < this.pageSelectedArr[i].length; j++) {
                    this.batchId.push(this.pageSelectedArr[i][j].user_id)
                }
            }
            console.log(this.batchId)
            if (this.batchId.length == 0) {
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                });
            } else {
                if (command == 1) {
                    let param = new Object()
                    param.usr_id_list = this.batchId
                    param.forbid_status = 1
                    ptfs_forbid_users(param)
                        .then(res => {
                            if (res.status == 0 && res.err_code == 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                })
                                this.queryUserList()
                                this.multipleSelectionAll = this.common.changePageCoreRecordData(this.multipleSelectionAll, this.multipleSelection, this.tableData, this.idKey);

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
                } else {
                    let param = new Object()
                    param.usr_id_list = this.batchId
                    param.forbid_status = 0
                    ptfs_forbid_users(param)
                        .then(res => {
                            if (res.status == 0 && res.err_code == 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                })
                                this.queryUserList()

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
                }

            }

        },
        exportExcel() {
            /* generate workbook object from table */
            let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
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

        .el-form-item__label {
            white-space: nowrap;
        }

        .el-form-item {
            margin-bottom: 0px;
            margin-left: 10px;
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
</style>
