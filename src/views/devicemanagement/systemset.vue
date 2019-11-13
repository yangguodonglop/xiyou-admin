<template>
<section class="myself-container">
    <div class="now_virson">
        <div class="now_virson_title">当前发布版本（全网）</div>
        <div class="now_virson_con">
            <div class="item">全网发布版本：
                {{this.high_version_info.rom_version}}
            </div>
            <div class="item">发布渠道:{{this.high_version_info.push_mod}}</div>
            <div class="item">
                <el-button type="primary" @click="clickCancel()" :disabled="cancelStatus">撤销</el-button>
            </div>
        </div>
        <div class="now_virson_title">当前发布版本（灰度）</div>
        <div class="now_virson_con" style="margin-top:10px;width: 100%;">
            <div class="item" style="width: 100%;">
                <el-table :data="tableDataActive" border style="width: 100%">
                    <el-table-column prop="version_group" label="灰度版本">
                    </el-table-column>
                    <el-table-column prop="push_mod" label="发布渠道">
                    </el-table-column>
                    <el-table-column prop="descript" label="版本描述">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div style="    color: rgb(102, 153, 255);cursor: pointer;" @click="handleClickSn(scope.row)" type="primary" size="small">设备清单</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <div class="device_form">
        <div class="device_form_button">
            <el-button @click="handleClickAdd" type="primary" size="small">新增发布</el-button>
        </div>
        <div class="button_con" v-if="buttonStatus">
            <div class="item">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="发布类型">
                        <el-select v-model="form.push_type" placeholder="请选择发布类型" @change="changePushtype">
                            <el-option label="全网发布" value="全网发布"></el-option>
                            <el-option label="灰度发布" value="灰度发布"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布版本">
                        <el-select v-model="form.version_group" placeholder="请选择发布版本" @change="change">
                            <el-option v-for="item in optionArr" :key="item" :label="item.label" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布渠道">
                        <el-radio-group v-model="form.push_mod">
                            <el-radio label="HTTP" @change="changeType"></el-radio>
                            <el-radio label="PTFS" @change="changeType"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="发布描述">
                        <el-input type="text" v-model="form.descript" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="发布SN号" v-if="textareaStatus">
                        <el-input type="textarea" v-model="form.sn_list"></el-input>
                    </el-form-item>
                    <el-form-item style="display: flex;justify-content: center;">
                        <el-button type="primary" @click="onSubmit">预览</el-button>
                        <el-button type="primary" @click="determine()">发布</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全网发布" name="first">
                <el-form ref="form" :model="form">
                    <el-row type="flex">
                        <el-col :span="5">
                            <el-select v-model="selectedValue" placeholder="请选择" @change="change">
                                <el-option v-for="item in optionArr" :key="item" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="发布渠道">
                                <el-radio v-model="radio" label="HTTPS" @change="changeType">HTTPS</el-radio>
                                <el-radio v-model="radio" label="PTFS" @change="changeType">PTFS</el-radio>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="发布描述">
                                <el-input v-model="form.inputText" placeholder="请输入发布描述"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="2">
                            <el-button type="primary" @click="getInfo()" :disabled="disableStatusActive">发布并预览</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" :disabled="disableStatus" @click="getInfo()">重新发布</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="灰度发布" name="second">
                <el-form ref="form" :model="form">
                    <el-row type="flex">
                        <el-col :span="3">
                            <el-button type="primary" @click="getShow()">添加设备清单</el-button>
                        </el-col>
                        <el-col :span="5">
                            <el-select v-model="selectedValue" placeholder="请选择" @change="change">
                                <el-option v-for="item in optionArr" :key="item" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="发布渠道">
                                <el-radio v-model="radio" label="HTTPS" @change="changeType">HTTPS</el-radio>
                                <el-radio v-model="radio" label="PTFS" @change="changeType">PTFS</el-radio>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="发布描述">
                                <el-input v-model="form.inputText" placeholder="请输入发布描述"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="2">
                            <el-button type="primary" @click="getInfo()" :disabled="disableStatusActive">发布并预览</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" :disabled="disableStatus" @click="getInfo()">重新发布</el-button>
                        </el-col>

                    </el-row>
                    <el-row type="flex" class="row_active" v-show="showState">
                        <textarea placeholder="复制SN或MAC清单，用换行隔开" v-model="textareaText"></textarea>
                    </el-row>
                </el-form>
            </el-tab-pane>
        </el-tabs> -->
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                发布历史
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
    <el-dialog :visible.sync="dialogReleaseState" class="my_dialog_set" :show-close="false" :close-on-click-modal="false">
        <div>
            <div>版本号： {{this.form.version_group}}</div>
            <div>发布渠道： {{this.form.push_mod}}</div>

            <div v-for="(item,index) in releaseInfo" :key="index">
                <div>文件名称： {{item.version_name}}</div>
            </div>
            <div>发布类型: {{this.form.push_type}}</div>
        </div>
        <div slot="footer" class="dialog-footer" style="">
            <el-button type="primary" @click="determineActive()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="newdialogReleaseState" class="my_dialog_setnew" :show-close="true">
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <template>

                    <div style="width:100%;height:35px;line-height:35px;">设备SN号</div>
                    <div style="width: 100%;height: auto;padding: 10px 30px;box-sizing: border-box;border: 1px solid #EBEEF5">
                        <span v-for="(item,index) in tableData11" v-bind:key="index">
                            {{item.node_hash}}，

                        </span>
                    </div>

                </template>
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
    getpacketbyversion,
    publishlist,
    getversion,
    publish,
    devicelist,
    versionlist,
    rollback
} from "../../api/api.js";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
    data() {
        return {
            activeName: 'first',
            radio: "HTTPS",
            textareaText: "",
            dialogReleaseState: false,
            releaseInfo: [],
            releaseVersion: "",
            pushMod: "",
            onloadStatus: "",
            push_type: "全网推送",
            nowVersion: "",
            disableStatus: true,
            disableStatusActive: false,
            newdialogReleaseState: false,
            operatingStatus: true,
            currentPage4: 1,
            textareaStatus: false,
            buttonStatus: false,
            tableDataActive: [],
            tableData11: [],
            cancelStatus: false,

            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "id",
                    label: "ID"
                },
                {
                    prop: "time_create",
                    label: "发布日期"
                },
                {
                    prop: "version_group",
                    label: "版本组"
                },
                {
                    prop: "push_type",
                    label: "发布类型"
                },
                {
                    prop: "push_mod",
                    label: "发布渠道"
                },

                {
                    prop: "descript",
                    label: "发布描述"
                },

            ],
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "设备清单",
                        type: "primary",
                        methods: "editOnchange"
                    },

                ]
            },
            pager: {
                count: "",
                page: 1,
                rows: 10
            },
            form: {
                push_type: '',
                version_group: '',
                push_mod: 'HTTP',
                descript: '',
                sn_list: ""
            },
            // form: {
            //     labelName: "发布描述",
            //     inputText: " "
            // },
            optionArr: [],
            dataResName: "注册日期",
            dataBindName: "首次绑定日期",

            showState: false,
            alertNum: 0,
            alertNumNode: 0,
            alertNumVersion: 0,
            dataNum: "8888",
            clomnSelection: false,
            high_version_info: {
                push_mod: "",
                rom_version: ""
            }
        };
    },
    mounted: function () {
        this.dataNum = this.tableData.length;
        this.queryInfo();
        this.getversionInfo();
        this.queryInfoVersion()
        if (this.nowVersion != this.selectedValue) {
            this.disableStatus = true
        } else {
            this.disableStatus = false
        }

    },
    methods: {

        //预览弹窗
        onSubmit() {
            let param = new Object()
            if (this.form.version_group == "") {
                this.$message({
                    message: "请选择版本才能预览",
                    type: "error"
                });
                return false
            }

            param.version = this.form.version_group
            getpacketbyversion(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.dialogReleaseState = true

                        this.releaseVersion = res.result.cols[0].rom_version
                        this.pushMod = res.result.cols[0].push_mod
                        this.releaseInfo = res.result.cols
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },

        //发布方式下拉改变
        changePushtype(val) {
            this.form.publishlist=val
            if (val == "灰度发布") {
                this.textareaStatus = true

            } else {
                this.textareaStatus = false

            }
        },
        //关闭预览弹窗
        determineActive() {
            this.dialogReleaseState = false
        },

        //确定发布
        determine() {
            if (this.form.push_type == "") {
                this.$message({
                    message: "请选择发布方式",
                    type: "error"
                });
                return false
            }
            if (this.form.version_group == "") {
                this.$message({
                    message: "请选择发布版本",
                    type: "error"
                });
                return false
            }
            if (this.form.push_type == "全网发布") {
                this.form.sn_list = ""
            }
            if (this.onloadStatus == 0 && this.push_mod == "PTFS") {
                this.disableStatusActive = true
                this.$message({
                    message: "升级包正分发至PTFS网络，请稍后发布",
                    type: "error"
                });
                return false
            } else {
                this.disableStatusActive = false
            }
            if (this.form.push_type == "灰度发布") {
                if (this.form.sn_list.length <= 0) {
                    this.$message({
                        message: "请输入SN号",
                        type: "error"
                    });
                    return false
                }

            }
            if(this.form.push_mod == "PTFS"){
                if(this.onloadStatus==0){
                    this.$message({
                    message: "升级包正分发至PTFS网络，请稍后发布",
                    type: "error"
                });
                return false 
                }
            }
            let param = new Object()
            param = this.form

            //alert(this.onloadStatus)
            //alert(JSON.stringify(param))
            publish(param)
                .then(res => {
                    //this.updateFrom = res.result
                    if (res.status != 0) {
                        this.$message({
                            message: "发布失败",
                            type: "error"
                        })
                    } else {
                        this.$message({
                            message: "发布成功",
                            type: "success"
                        });
                        this.queryInfo()
                        this.getversionInfo()
                    }
                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });

                });
        },

        //判断升级包是否发至PTFS网络
        changeType() {
            if (this.onloadStatus == 0 && this.radio == "PTFS") {
                this.disableStatusActive = true
                this.$message({
                    message: "升级包正分发至PTFS网络，请稍后发布",
                    type: "error"
                });
            } else {
                this.disableStatusActive = false
            }
        },

        //版本下拉执行操作
        change(val) {
           

            this.form.version_group = val.value.rom_version
            // if (val == "灰度发布") {
            //     this.textareaStatus = true
            // } else {
            //     this.textareaStatus = false
            // }
            this.onloadStatus = val.value.ptfs_file_upload_status
            // if (this.nowVersion != val.rom_version) {
            //     this.disableStatus = true
            // } else {
            //     this.disableStatus = false
            // }
            // if (this.onloadStatus == 0 && this.radio == "PTFS") {

            //     this.disableStatusActive = true
            // } else {
            //     this.disableStatusActive = false
            // }
        },

        //新增发布
        handleClickAdd() {
            this.buttonStatus = true
        },
        //查询灰度全网发布版本信息，当前版本信息
        queryInfoVersion() {
            let param = new Object()
            param.page = 0
            versionlist(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        if (res.high_version_info) {
                            this.high_version_info = res.high_version_info
                            this.cancelStatus = false
                        } else {
                            this.high_version_info.rom_version = "暂无发布版本"
                            this.high_version_info.push_mod = "暂无发布方式"
                            this.cancelStatus = true
                        }

                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.alertNumVersion = nowarrLength
                        this.tableDataActive = nowarractive
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },

        //查看设备清单详情
        handleButton(val) {
            this.newdialogReleaseState = true
            if (val.methods == "editOnchange") {
                let param = new Object()
                param.push_key = val.row.push_key;
                param.user_id = ""
                param.sn = ""
                param.node_hash = ""
                param.status = ""
                devicelist(param)
                    .then(res => {
                        if (res.status != 0) {
                            this.$message({
                                message: `${res.msg}`,
                                type: "error"
                            });
                        } else {
                            let nowarractive = res.result.cols
                            let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                            this.alertNumNode = nowarrLength
                            this.tableData11 = nowarractive
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

        //查看设备清单详情
        handleClickSn(val) {
            this.newdialogReleaseState = true
            let param = new Object()
            param.push_key = val.push_key;
            param.user_id = ""
            param.sn = ""
            param.node_hash = ""
            param.status = ""
            devicelist(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        let nowarractive = res.result.cols
                        let nowarrLength = res.result.page * 10 + nowarractive.length + res.result.les_count
                        this.alertNumNode = nowarrLength
                        this.tableData11 = nowarractive
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },

        //撤销当前发布的版本
        clickCancel() {
            let param = new Object()
            param.rom_version = this.high_version_info.rom_version;

            rollback(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            message: "撤销成功",
                            type: "success"
                        });
                        this.queryInfoVersion()
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },

        handleSelectionChange(val) {
            this.alertNum = val.length
        },
        handleSizeChange(val) {
            //this.pager.page=val

        },
        handleSizeChange1(val) {
            //this.pager.page=val

        },
        handleCurrentChange1(val) {
            this.pager.page = val.val
            this.queryInfo()
        },
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryInfo()
        },
        //
        changeType() {
            //this.getversionInfo()
            if (this.onloadStatus == 0 && this.form.push_mod == "PTFS") {
                this.disableStatusActive = true
                this.$message({
                    message: "升级包正分发至PTFS网络，请稍后发布",
                    type: "error"
                });
            } else {
                this.disableStatusActive = false
            }
        },
        changeTypeActive(val) {

        },
        getInfo() {
            if (this.activeName == "first") {
                this.push_type = "全网发布"

            } else {
                this.push_type = "灰度发布"
            }
            this.dialogReleaseState = true
            let param = new Object()
            param.version = this.selectedValue
            getpacketbyversion(param)
                .then(res => {
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.msg}`,
                            type: "error"
                        });
                    } else {
                        this.releaseVersion = res.result.cols[0].rom_version
                        this.pushMod = res.result.cols[0].push_mod
                        this.releaseInfo = res.result.cols
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
            param.page = this.pager.page - 1
            publishlist(param)
                .then(res => {
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

        getShow() {
            this.showState = !this.showState;
        },
        handleCommand(command) {
            if (this.alertNum == 0) {
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                });
            } else {}

        },
        //获取版本列表
        getversionInfo() {
            let param = new Object()
            getversion(param)
                .then(res => {
                    if (res.status == 0) {
                        let nowarr = res.result.cols
                        if (nowarr.length > 0) {
                            this.optionArr = []
                            for (var i = 0; i < nowarr.length; i++) {
                                let nowobject = new Object()
                                nowobject = {
                                    label: nowarr[i].rom_version,
                                    value: nowarr[i]
                                }
                                this.optionArr.push(nowobject)
                            }
                            //this.onloadStatus = nowarr[0].ptfs_file_upload_status
                            this.selectedValue = nowarr[0].rom_version
                            this.nowVersion = res.result.high_version
                            this.disableStatusActive = false
                            this.disableStatus = false
                        } else {
                            this.disableStatusActive = true
                            this.disableStatus = true
                        }

                    } else {
                        this.$message({
                            message: "网络出错，请重新请求",
                            type: "error"
                        });
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

        .device_form_button {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .button_con {
            width: 100%;
            height: auto;
            overflow: hidden;

            .item {}
        }

        .el-form-item {
            margin-bottom: 0px;
            margin-top: 10px;
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

.myself-container .my_dialog_setnew .el-dialog {
    width: 40%;

    .el-dialog__body {
        padding-top: 0px;
    }
}

.now_virson {
    width: 100%;
    height: auto;
    background: #f2f2f2;
    color: #606266;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    padding: 10px 0px;
    overflow: hidden;
    box-sizing: border-box;

    .now_virson_title {
        width: 100%;
        margin-left: 20px;
        font-size: 14px;
    }

    .now_virson_con {
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        .item {
            margin-left: 50px;

            .el-table td,
            .el-table th {
                padding: 5px 0px;
            }
        }

    }
}
</style>
