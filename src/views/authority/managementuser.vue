<template>
<section class="myself-container adduserActive">
    <div class="devide_table">

        <el-row type="flex" class="row_active" justify="space-between" style=" justify-content: flex-end;">
            <el-col :span="24">
                <el-button type="primary" @click="addUser">新增用户</el-button>
            </el-col>

        </el-row>
        <el-row type="flex" class="row_active" style="margin-top:20px;">
            <el-col :span="24">
                <tableBarActive3 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive3>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <myDatanums :dataNum="dataNum"></myDatanums>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation">

        <el-row type="flex" style="float:right;">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="17%" :before-close="handleClose">
        <div class="adduser">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">添加系统用户</h3>
                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm2.username" placeholder="用户名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="用户昵称:">
                        <el-input v-model="ruleForm2.nickname" placeholder="用户昵称"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password">
                    <el-form-item label="密码:" placeholder="密码">
                        <el-input v-model="ruleForm2.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-form-item label="确认密码:">
                        <el-input v-model="ruleForm2.password2" placeholder="请再次密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="value">
                    <el-form-item label="选择权限:">
                        <el-select v-model="ruleForm2.value" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>

                <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">立即提交</el-button>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
     <el-dialog :visible.sync="dialogVisible1" width="17%" :before-close="handleClose">
        <div class="adduser">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-position="left" class="demo-ruleForm ">
                <h3 class="title">添加系统用户</h3>
                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm1.username" placeholder="用户名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="用户昵称:">
                        <el-input v-model="ruleForm1.nickname" placeholder="用户昵称"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password">
                    <el-form-item label="密码:" placeholder="密码">
                        <el-input v-model="ruleForm1.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-form-item label="确认密码:">
                        <el-input v-model="ruleForm1.password2" placeholder="请再次密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="value">
                    <el-form-item label="选择权限:">
                        <el-select v-model="ruleForm1.value" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>

                <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit1" :loading="logining">立即提交</el-button>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>

</section>
</template>

<script>
import titleBar from "../../components/titleBar";
import tableBar from "../../components/tableBar";
import tableBarActive3 from "../../components/tableBarActive3";

import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";

import {
    userlist,
    userdelete,
    userinsert,
    rolelistfortop,
    userupdate
} from '../../api/api';
import common from "../../common/js/util.js"

export default {
    data() {
        return {

            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            dialogVisible: false,
            dialogVisible1: false,
            value1: "",
            value2: "",
            options: [],
            value: '',
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "id",
                    label: "ID"
                },
                {
                    prop: "username",
                    label: "用户名"
                },
                {
                    prop: "password",
                    label: "密码"
                },
                {
                    prop: "nickname",
                    label: "昵称"
                },

                {
                    prop: "time_create",
                    label: "创建时间"
                },
                {
                    prop: "time_update",
                    label: "更新时间"
                },

            ],
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "编辑",
                        type: "primary",
                        methods: "edit"
                    },
                    {
                        label: "删除",
                        type: "primary",
                        methods: "delete"
                    }

                ]
            },
            pager: {
                count: 0,
                page: 1,
                rows: 100
            },

            showState: false,

            dropdownArr: [{
                    name: "批量冻结",
                    value: "1"
                },
                {
                    name: "批量解冻",
                    value: "2"
                }
            ],
            logining: false,
            ruleForm2: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",

            },
               ruleForm1: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                id:"",

            },
            rules2: {
                username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                nickname: [{
                        required: true,
                        message: '请输入用户昵称',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
                password2: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    

                    //{ validator: validaePass2 }
                ],
                    value: [{
                        required: true,
                        message: '请选择类型',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
            },
             rules1: {
                username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                nickname: [{
                        required: true,
                        message: '请输入用户昵称',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
                password: [{
                        required: false,
                        message: '请输入密码',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
                password2: [{
                        required: false,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    

                    //{ validator: validaePass2 }
                ],
                    value: [{
                        required: true,
                        message: '请选择类型',
                        trigger: 'blur'
                    },

                    //{ validator: validaePass2 }
                ],
            },
            checked: true

        };
    },
    mounted: function () {
        this.queryUserList()
        this.queryRolelist()
    },
    methods: {
        queryRolelist() {
            rolelistfortop().then(res => {
                console.log(res)
                if (res.status == 0) {
                    //let 
                     this.options  = JSON.parse(JSON.stringify(res.msg).replace(/"name"/g, "\"label\"").replace(/"id"/g, "\"value\""))
                    console.log(this.options)
                } else {
                    this.$message({
                        message: `${res.msg}`,
                        type: "error"
                    })
                }

            }).catch(error => {
                console.log(error)
            })
        },
        addUser() {
            

        
            this.dialogVisible = true
               
                this.ruleForm2.username= ""
                  this.ruleForm2.nickname= ""
                 this.ruleForm2.password= ""
                 this.ruleForm2.password2= ""
                 this.ruleForm2.value= ""
               this.$refs.ruleForm2.resetFields();
        },
        queryUserList() {
            let param = new Object()
            param.page = this.pager.page - 1
            userlist(param)
                .then(res => {
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })

                    } else {
                        if (res.result.page == 0) {

                            this.pager.count = res.result.cols.length * (res.result.page + 1) + res.result.les_count

                        } else {
                            this.pager.count = 10 + res.result.cols.length * (res.result.page) + res.result.les_count

                        }
                        let nowArr = res.result.cols
                        for (var i = 0; i < nowArr.length; i++) {
                            nowArr[i].time_create = this.common.getTimes(parseInt(nowArr[i].time_create * 1000))
                            nowArr[i].time_update = this.common.getTimes(parseInt(nowArr[i].time_update * 1000))

                        }

                        this.tableData = nowArr
                    }

                })

        },
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryUserList()
        },
        handleButton(val, rows) {

            let setType = val
            console.log(rows)
            //let paramInfo=rows.nickname
            console.log(setType)
            if (setType == "edit") {
               // debugger
                this.dialogVisible1=true
                // this.$router.push({
                //     path: '/userinformation1',
                //     query: paramInfo
                // })
                this.ruleForm1.username=rows.username
                this.ruleForm1.nickname=rows.nickname
                this.ruleForm1.value=rows.role_id
                this.ruleForm1.id=rows.id
           

            } else {
                let param = new Object()
                param.id = rows.id
                this.$confirm('确定要删除角色吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    userdelete(param).then(res => {
                        if (status != 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.queryUserList()
                        }
                    }).catch(error => {

                    })
                }).catch(() => {

                });
            }
         

        },
    
        handleReset2() {
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var loginParams = {
                        username: this.ruleForm2.username,
                        nickname: this.ruleForm2.nickname,
                        password: this.ruleForm2.password,
                        password2: this.ruleForm2.password2,
                        role_id: this.ruleForm2.value,
                    };
                    userinsert(loginParams).then(data => {
                        this.logining = false;
                        this.dialogVisible = false
                        let {
                            msg,
                            status,
                            user
                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.queryUserList()
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
         handleSubmit1(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm1.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var loginParams = {
                        username: this.ruleForm1.username,
                        nickname: this.ruleForm1.nickname,
                        password: this.ruleForm1.password,
                        password2: this.ruleForm1.password2,
                        role_id: this.ruleForm1.value,
                        id:this.ruleForm1.id
                        
                    };
                    userupdate(loginParams).then(data => {
                        this.logining = false;
                        this.dialogVisible1 = false
                        let {
                            msg,
                            status,
                            user
                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.queryUserList()
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

    },
    components: {
        tableBarActive3: tableBarActive3,
        pageNation: pageNation
    }
};
</script>

<style lang="less">
.myself-container {
  .title {
    width: 100%;
    text-align: center;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

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

.adduserActive {
  .adduser {
    .el-form-item__error {
      left: 105px;
    }

    .el-form {
      .el-form-item {
        .el-form-item__content {
          width: 100%;

          .el-form-item__label {
            width: 140px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
