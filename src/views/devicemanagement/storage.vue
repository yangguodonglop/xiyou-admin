<template>
<section class="myself-container">
    <div class="devide_title">
       <el-row type="flex">
            <el-col :span="24">
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-row>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active1" style="width:100%;">
                                <div class="item_one">入库西柚机</div>
                                <div class="item_two">{{user_form.total_dev_cnt}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="new_cont new_cont_active2" style="width:100%;">
                                <div class="item_one">激活西柚机</div>
                                <div class="item_two">{{user_form.activated_dev_cnt}}</div>
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
            <el-row type="flex" class="row_active row_active_monitor">
                <el-form-item label="设备SN">
                    <el-input v-model="form.inputText1" placeholder="请输入设备SN"></el-input>
                </el-form-item>
          
                <!--  <el-form-item label="节点ID">
                    <el-input v-model="form.inputText2" placeholder="请输入节点ID"></el-input>
                </el-form-item> -->
                <el-button type="primary" @click="getInfo()" style="margin-left:30px;">搜索</el-button>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="2">
                <el-button type="primary" @click="goStorage()">入库</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active" justify="space-between">
            <el-col :span="10">
                <myAlert :alertNum="alertNum"></myAlert>
            </el-col>
        </el-row>
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

    <el-dialog :visible.sync="dialogFormState" class="my_dialogForm" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

            <div class="dialog_item">
                <div class="dialog_item_l">设备型号：</div>
                <div class="dialog_item_r">
                    <el-select v-model="newFrom.dev_type" placeholder="请选择设备型号" style="width:100%;">
                        <el-option v-for="item in optionsActive" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">设备SN：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFrom.dev_sn" placeholder="请输入设备SN"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">MAC地址：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFrom.dev_mac" placeholder="请输入MAC地址"></el-input>
                </div>
            </div>
                <div class="dialog_item">
                <div class="dialog_item_l">CPU_ID：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFrom.cpu_id" placeholder="请输入CPU_ID"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">可用容量：</div>
                <div class="dialog_item_r">
                    <el-input v-model="free_cap_active" placeholder="请输入可用容量" style="width:150px;"></el-input>
                    <el-select v-model="valueActive" placeholder="请选择" style="width:100px;float:right" @change="changeCap">
                        <el-option v-for="item in options" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">总容量：</div>
                <div class="dialog_item_r">
                    <el-input v-model="total_cap_active" placeholder="请输入总容量" style="width:150px;"></el-input>
                    <el-select v-model="valueActive1" placeholder="请选择" style="width:100px;float:right">
                        <el-option v-for="item in options1" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormState = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload()">确 定</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormEdit" class="my_dialogForm" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

            <div class="dialog_item">
                <div class="dialog_item_l">设备型号：</div>
                <div class="dialog_item_r">
                    <el-select v-model="valueActive" placeholder="请选择设备型号" style="width:100%;">
                        <el-option v-for="item in optionsActive" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">设备SN：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFromEdit.app_name" placeholder="请输入设备SN"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">MAC地址：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFromEdit.app_name" placeholder="请输入MAC地址"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">可用容量：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFromEdit.app_name" placeholder="请输入总容量" style="width:150px;"></el-input>
                    <el-select v-model="value" placeholder="请选择" style="width:100px;float:right">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">总容量：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFromEdit.app_name" placeholder="请输入总容量" style="width:150px;"></el-input>
                    <el-select v-model="value" placeholder="请选择" style="width:100px;float:right">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload()">确 定</el-button>
            </div>
        </div>
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
    devicelist,
    savedevice,
    device_cnt_overview
} from "../../api/api.js";
import common from "../../common/js/util.js"
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            dialogFormState: false,
            dialogFormEdit: false,
            listArray: [{
                    title: "入库西柚机",
                    nums: "80022"
                },
                {
                    title: "激活西柚机",
                    nums: "1800"
                },
                {
                    title: "在线西柚机",
                    nums: "2800"
                },
                {
                    title: "备用模块",
                    nums: "3800"
                }
            ],
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
                    prop: "miner_mac",
                    label: "MAC地址"
                },
                       {
                    prop: "cpu_id",
                    label: "CPU_ID"
                },
                {
                    prop: "online_state",
                    label: " 设备状态"
                },
                {
                    prop: "time_create",
                    label: "入库时间"
                },
            ],

            tableData: [],
            tableOption: {
                label: "操作",
                width: 250,
                options: [{
                        label: "编辑",
                        type: "primary",
                        methods: "editOnchange"
                    },

                ]
            },
            pager: {
                count: 40,
                page: 1,
                rows: 10
            },
            form: {
                labelName: "用户ID",
                inputText: "",
                inputTextactive: "请输入用户ID",
                labelName1: "设备SN",
                inputText1: "",
                inputTextactive1: "请输入设备SN号",

                labelName2: "节点ID",
                inputText2: "",
                inputTextactive2: "请输入节点ID",

                optionArr: ["全部", "在线", "离线", "磁盘异常"],
                selectName: "设备状态",
                selectedValue: "全部",
                datapickeResValue: [
                    new Date(1800, 10, 10, 10, 10),
                    new Date(1900, 10, 11, 10, 10)
                ],
                value1: '',
            },
            newFrom: {
                dev_type: "",
                dev_sn: "",
                dev_mac: "",
                cpu_id:""
                //  free_cap: "",
                // total_cap:"",

            },
            free_cap_active: "",
            total_cap_active: "",
            newFromEdit: {
                app_version: "",
                app_name: "",
                app_info: "",
                app_download_url: "",
                size: "",
                app_info: ""
            },
            options: ["TB", "GB"],
                        options1: ["TB", "GB"],

            //   options1: [{
            //         value: '选项1',
            //         label: 'TB'
            //     },
            //     {
            //         value: '选项2',
            //         label: 'GB'
            //     }
            // ],
            optionsActive: [{
                    value: '2',
                    label: '我的西柚机'
                },
                {
                    value: '0',
                    label: '我的西柚机111'
                }
            ],
            valueActive: 'TB',
            valueActive1: 'TB',
            showState: false,
            alertNum: 0,
            dataNum: "8888",
            clomnSelection: false,
            push_key: "",
            operatingStatus: false,
            free_cap_status: "",
            total_cap_status:"",
                 user_form: {
                total_dev_cnt: "",
                online_dev_cnt: "",
                activated_dev_cnt: ""
            },
        };
    },
    mounted: function () {

        this.push_key = this.$route.query.push_key
        this.dataNum = this.tableData.length;
        this.free_cap_status = this.free_cap_active
        this.total_cap_status = this.total_cap_active
        this.queryInfo()
        this.queryUsersTotal()
    },
    methods: {
        //改变GB.TB
        changeCap(val) {
            this.valueActive = val

        },
           queryUsersTotal() {
            let param = new Object()
            device_cnt_overview(param)
                .then(res => {
                    console.log(res)
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
        handleButton(val) {
            console.log(val);
            if (val.methods == "editOnchange") {
                this.dialogFormEdit = true

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
            this.queryInfo()
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
        getInfo() {
            this.queryInfo()
        },
        //查询发布版本历史信息
        queryInfo() {
            let param = new Object()
            if (this.push_key != undefined) {
                param.push_key = this.push_key;
                param.user_id = "";
                param.dev_sn = "";
                param.node_hash = "";
                param.status = "";
            } else {
                param.push_key = "";
                param.user_id = this.form.inputText;
                param.dev_sn = this.form.inputText1;
                param.node_hash = this.form.inputText2;
                param.status = this.form.selectedValue;
            }

            param.page = this.pager.page - 1
            devicelist(param)
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
                            nowarractive[i].time_update = this.common.getTimes(parseInt(nowarractive[i].time_update * 1000))
                            switch (nowarractive[i].bind_state) {
                                case "0":
                                    nowarractive[i].bind_state = "在线"
                                    break;
                                case "1":
                                    nowarractive[i].bind_state = "离线"
                                    break;

                            }
                            switch (nowarractive[i].online_state) {
                                case "0":
                                    nowarractive[i].online_state = "是"
                                    break;
                                case "1":
                                    nowarractive[i].online_state = "否"
                                    break;

                            }
                        }
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
        //入库按钮
        goStorage() {
            this.dialogFormState = true
        },
        //入库确定按钮
        submitUpload() {
            this.dialogFormState=false
            let param = new Object()
            param = this.newFrom
            if (this.valueActive == "TB") {
                this.free_cap_status = this.free_cap_active
     
            } else {
                this.free_cap_status = this.free_cap_active / 1024
                 
            }
              if (this.valueActive1 == "TB") {
                   this.total_cap_status = this.total_cap_active
            } else {
                this.total_cap_status = this.total_cap_status / 1024
            }
            this.newFrom.free_cap = this.free_cap_status
            this.newFrom.total_cap = this.total_cap_status
            savedevice(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            type: 'success',
                            message: '入库成功'
                        });
                        this.queryInfo()

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
                justify-content: flex-start;

                .el-form-item {
                    margin-left: 30px;
                    margin-top: 0px;
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
