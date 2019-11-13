<template>
<section class="myself-container">
    <div class="device_release">
        <div class="bottom_boador">
            <el-row type="flex" class="row_active" justify="center" style="margin-bottom:20px;">
                <el-col :span="18">
                    <div class="device_release_step">
                        <el-steps :active="stepActive" align-center>
                            <el-step title="筛选设备"></el-step>
                            <el-step title="选定应用"></el-step>
                            <el-step title="选定操作"></el-step>
                            <el-step title="确认执行"></el-step>
                        </el-steps>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>1、筛选设备</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1">
                    <el-form-item label="用户ID">
                        <el-input v-model="form.inputText" placeholder="请输入用户ID"></el-input>
                    </el-form-item>
                    <el-form-item label="设备SN区间">
                        <textarea placeholder="请输入SN号" v-model="form.inputText1"></textarea>
                    </el-form-item>

                    <el-form-item label="设备型号">
                        <el-select v-model="form.selectedValue">
                            <el-option v-for="item in form.optionArr" :key="item" :label="item.type_info" :value="item.type"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态">

                        <el-select v-model="form.selectedValue2" placeholder="请选择" @change="changeArr">
                            <el-option v-for="item in form.optionArractive2" :key="item" :label="item.label" :value="item.value">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="onClickQueryinfo()">确定</el-button>

                    </el-form-item>

                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>2、选定应用</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1 row_active4" justify="start">
                    <el-form-item label="选择应用">
                        <el-select v-model="form.selectedValue3" @change="change">
                            <el-option v-for="item in form.optionArr3" :key="item" :label="item.app_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择版本" style="margin-left:50px;" v-if="inputStatus">
                        <el-select v-model="form.selectedValue5">
                            <el-option v-for="item in form.optionArr5" :key="item" :label="item.version" :value="item.version"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active">
                    <el-col :span="6">
                        <div>3、选定操作</div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row_active row_active1 row_active2">
                    <el-form-item label="选择操作">
                        <el-select v-model="form.selectedValue4" @change="changePerform">
                            <el-option v-for="item in form.optionArr4" :key="item" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="bottom_boador bottom_boador_active">
            <el-form ref="form" :model="form">
                <el-row type="flex" class="row_active row_active1 row_active3">
                    <el-button type="primary" @click="onClickPerform()">确定执行</el-button>

                </el-row>
            </el-form>
        </div>

    </div>
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
    <el-dialog :visible.sync="newdialogReleaseState" class="my_dialog_setnew" :show-close="false">
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <template>
                    <el-table :data="tableDataActive" border style="width: 100%">
                        <el-table-column prop="app_name" label="应用名称">
                        </el-table-column>
                        <el-table-column prop="app_version" label="应用版本">
                        </el-table-column>
                        <el-table-column prop="app_status" label="应用状态">
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:10px;">
            <el-col :span="6">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="this.alertNumActive">
                </el-pagination>
            </el-col>
        </el-row>
    </el-dialog>

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
    updateNodeConfigtest,
    queryRom,
    saveRom,
    deleteRom,
    findRomById,
    updateRom,
    getpacketbyversion,
    publish,
    updateMod,
    saveapp,
    applist,
    appdevicelist,
    applistfortree,
    verlistfortree,
    devicectrl,
    getappbydev,
    getmactype

} from "../../api/api.js";
import common from '../../common/js/util.js'
import echarts from 'echarts'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            inputStatus: false,
            tableData11: [],
            tableDataActive: [],
            stepActive: "4",
            newdialogReleaseState: false,
            operatingStatus: true,
            currentPage4: 1,
            form: {
                labelName: "用户ID",
                inputText: "",
                inputTextactive: "请输入用户ID",
                labelName1: "设备SN区间",
                inputText1: "",
                inputTextactive1: "请输入SN起始编号",
                labelName2: "",
                inputText2: "",
                inputTextactive2: "请输入SN终止编号",
                optionArr: ["全部", "P001", "P002"],
                selectedValue: "",
                selectedlabel: "",
                selectedlabel1: "",
                selectedlabel2: "",
                optionArractive2: [

                    {
                        label: "在线",
                        value: 1,
                    },
                    {
                        label: "离线",
                        value: 0,
                    },
                ],
                selectedValue2: "",
                optionArr3: [],
                selectedValue3: "",
                optionArr5: [],
                selectedValue5: "",
                optionArr4: [{
                        value: 1,
                        label: "安装"
                    },
                    {
                        value: 2,
                        label: "运行",
                    },
                    {
                        value: 3,
                        label: "停止"
                    },
                    {
                        value: 4,
                        label: "卸载"
                    },
                ],
                selectedValue4: ""
            },
            rowHeader: [
                  {
                    prop: "user_id",
                    label: "绑定用户ID",
                },
                {
                    prop: "sn",
                    label: "设备SN",
                },
                // 未做任何格式化处理的数据
                {
                    prop: "dev_type",
                    label: "设备型号",
                },

                {
                    prop: "ip",
                    label: "设备IP",
                },
                {
                    prop: "status",
                    label: "设备状态",

                },
                {
                    prop: "user_phone",
                    label: "绑定用户手机号",
                },
                {
                    prop: "app_count",
                    label: "应用数量",
                },
                {
                    prop: "app_status",
                    label: "应用状态",
                },

            ],
            tableOption: {
                label: "操作",
                options: [{
                    label: "详情",
                    type: "primary",
                    methods: "checkOnchange"
                }, ]
            },
            tableData: [],

            pager: {
                count: 40,
                page: 1,
                pageActive: 1,
                rows: 10
            },
            alertNum: 0,
            alertNumActive: 0,
            dataNum: "",
            clomnSelection: false,
            textareaText: "添加版本描述",
            newParam: {},
            app_version: ""

        };
    },
    mounted: function () {
        this.getinfo();
        this.queryinfoList()
        this.querydeviceTypeInfo()
    },

    methods: {
        //详情弹窗
        handleButton(val) {
            this.newdialogReleaseState = true
            if (val.methods == "checkOnchange") {
                let param = new Object()
                param.sn = val.row.sn
                param.page = 0
                getappbydev(param)
                    .then(res => {
                        if (res.status != 0) {
                            this.$message({
                                message: `${res.msg}`,
                                type: "error"
                            });
                        } else {
                            let nowarractive = []
                            nowarractive = res.data.items
                            if (nowarractive.length > 0) {
                                for (var i = 0; i < nowarractive.length; i++) {
                                    switch (nowarractive[i].app_status) {
                                        case 1:
                                            nowarractive[i].app_status = "未安装"
                                            break;
                                        case 2:
                                            nowarractive[i].app_status = "安装中"
                                            break;
                                        case 3:
                                            nowarractive[i].app_status = "已安装"
                                            break;
                                        case 4:
                                            nowarractive[i].app_status = "启动中"
                                            break;
                                        case 5:
                                            nowarractive[i].app_status = "已启动"
                                            break;
                                        case 6:
                                            nowarractive[i].app_status = "停止中"
                                            break;
                                        case 7:
                                            nowarractive[i].app_status = "已停止"
                                            break;
                                        case 8:
                                            nowarractive[i].app_status = "卸载中"
                                            break;
                                        case 9:
                                            nowarractive[i].app_status = "已卸载"
                                            break;

                                    }

                                }

                            }

                            this.tableDataActive = nowarractive
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
        handleSizeChange(val) {

        },
        handleSizeChange1(val) {

        },
        handleCurrentChange(val) {
            this.getinfo()
        },
        handleCurrentChange1(val) {
            this.getinfo()
        },
        //获取下发指定操作
        changePerform(val) {
            this.form.selectedlabel2 = val
            if (val == 2 || val == 3 || val == 4) {
                this.app_version = ""

            } else {
                this.app_version = this.form.selectedValue5
            }

        },
        changeArr(val) {
            //this.form.selectedValue2=val
            // this.form.optionArr4 = val.children
            this.form.selectedlabel = val
        },
        //获取应用版本
        change(val) {
            let param = new Object()
            param.id = val
            verlistfortree(param)
                .then(res => {

                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        if (res.data.length > 0) {
                            this.inputStatus = true
                            this.form.optionArr5 = []
                            this.form.optionArr5 = res.data
                            this.form.selectedValue5 = res.data[0].version
                        } else {
                            this.inputStatus = false
                            this.$message({
                                message: "请添加应用版本",
                                type: "error"
                            });
                        }

                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },

        //确认查询
        onClickQueryinfo() {
            this.getinfo();

        },
        //确认执行操作
        onClickPerform() {
            let param = new Object()
            param.app_id = this.form.selectedValue3
            this.app_version = this.form.selectedValue5
            param.app_version = this.app_version
            param.action_id = this.form.selectedlabel2
            let nowstr = this.form.inputText1
            let strs = new Array()
            strs = nowstr.split("\n")
            for (var i = 0; i < strs.length; i++) {
                if (strs[i] == "") {
                    strs.splice(i, 1)
                    i = i - 1;
                }
            }
            param.sn_range = strs
            param.user_id = this.form.inputText
            param.type = this.form.selectedValue
            param.status = this.form.selectedlabel
            if (param.app_id == "") {
                this.$message({
                    message: "请选择应用在执行操作",
                    type: "error"
                });
                return false;
            }
            if (param.action_id == "") {
                this.$message({
                    message: "请选定操作在执行操作",
                    type: "error"
                });
                return false;
            }
            devicectrl(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getinfo();
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });

        },

        //获取设备型号列表
        querydeviceTypeInfo() {
            let param = new Object()
            getmactype(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.form.optionArr = res.data
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },

        //应用列表获取
        queryinfoList() {
            let param = new Object()
            applistfortree(param)
                .then(res => {
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.form.optionArr3 = res.data
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });

        },

        //获取页面表格数据
        getinfo() {
            let param = new Object()
            let sn_range = new Array()
            let nowstr = this.form.inputText1
            let strs = new Array()
            strs = nowstr.split("\n")
            for (var i = 0; i < strs.length; i++) {
                if (strs[i] == "") {
                    strs.splice(i, 1)
                    i = i - 1;
                }
            }
            param.sn_range = strs
            param.user_id =parseInt(this.form.inputText) 
            param.type = this.form.selectedValue
            param.status = this.form.selectedlabel
            param.page = this.pager.page - 1
            appdevicelist(param)
                .then(res => {

                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        let nowarr = res.data.dev_array
                        let nowarractive = res.data.cols
                        let nowarrLength = res.page * 10 + nowarr.length + res.les_count
                        this.pager.count = nowarrLength
                        this.dataNum = nowarrLength
                        for (var i = 0; i < nowarr.length; i++) {
                            switch (nowarr[i].dev_type) {
                                case 2:
                                    nowarr[i].dev_type = "初代西柚机"
                                    break;
                            }
                            switch (nowarr[i].status) {
                                case 0:
                                    nowarr[i].status = "离线"
                                    break;
                                case 1:
                                    nowarr[i].status = "在线"
                                    break;

                            }
                             switch (nowarr[i].app_status) {
                                 case 0:
                                            nowarr[i].app_status = "未安装"
                                            break;
                                        case 1:
                                            nowarr[i].app_status = "未安装"
                                            break;
                                        case 2:
                                            nowarr[i].app_status = "安装中"
                                            break;
                                        case 3:
                                            nowarr[i].app_status = "已安装"
                                            break;
                                        case 4:
                                            nowarr[i].app_status = "启动中"
                                            break;
                                        case 5:
                                            nowarr[i].app_status = "已启动"
                                            break;
                                        case 6:
                                            nowarr[i].app_status = "停止中"
                                            break;
                                        case 7:
                                            nowarr[i].app_status = "已停止"
                                            break;
                                        case 8:
                                            nowarr[i].app_status = "卸载中"
                                            break;
                                        case 9:
                                            nowarr[i].app_status = "已卸载"
                                            break;

                                    }

                        }
                        this.tableData = nowarr
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

    .my_dialogForm .el-dialog {
        width: 25%;
    }

    #device_echars_l {
        width: 50%;
        height: 300px;
        margin: 0 auto;
    }

    #device_echars_l1 {
        width: 50%;
        height: 300px;
        margin: 0 auto;
    }

    #device_echars_l2 {
        width: 50%;
        height: 300px;
        margin: 0 auto;
    }

    .dialog_div .dialog_div_con {
        padding-bottom: 20px;
    }

    .upload-demo {
        margin: 0 auto;
    }

    .dialog_div .dialog_div_upload .el-upload-dragger {
        width: 390px;
    }

    .dialog_div .dialog_div_desc {
        padding-left: 0px;

        textarea {
            width: 96%;
            border: 1px solid #DCDFE6;
        }
    }

    .my_dialogForm {
        .dialog_item {
            width: 90%;
            height: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            margin-bottom: 10px;

            .dialog_item_l {
                width: 90px;
                height: 35px;
                line-height: 35px;
                text-align: left;
                float: left;
            }

            .dialog_item_r {
                width: 350px;

            }
        }
    }

}

.device_release {
    width: 100%;
    height: auto;
    overflow: hidden;

    .bottom_boador {
        border-bottom: 1px solid #EBEEF5;
        margin-bottom: 20px;
        margin-top: 20px;

        &.bottom_boador_active {
            border: none;
        }
    }

    .device_release_step {
        margin-top: 30px;
        margin: 0 auto;
    }

    .row_active1 {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .el-form-item__content {
            height: 40px;
        }

        textarea {
            resize: none;
            border: 1px solid #DCDFE6;
            height: 40px;
            border-radius: 3px;
            padding-top: 10px;
            padding-left: 5px;
            box-sizing: border-box;
            font-family: "微软雅黑";
            width: 300px;
        }

        &.row_active2 {
            justify-content: flex-start;
        }

        &.row_active2 {
            justify-content: space-between;
        }

        &.row_active3 {
            justify-content: center;
        }

        &.row_active4 {
            justify-content: flex-start;
        }
    }
}
</style>
