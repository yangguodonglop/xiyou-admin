<template>
<div class="setmenu">
    <div class="devide_table" style="margin-top:30px;">

        <el-row type="flex" class="row_active" justify="space-between" style=" justify-content: flex-end;">
            <el-col :span="24">
                <el-button type="primary" @click="addAuthority">新增权限</el-button>
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
    <div class="devide_pageNation" style="margin-top:30px;">

        <el-row type="flex" style="float:right;">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
        <div class="menu">

            <div class="item">
                <div class="item_l">权限名称1:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="permissionName1" placeholder="请输入权限名称"></el-input>
                </div>
            </div>
            <div class="item">
                <div class="item_l">权限类别:</div>
                <div class="item_r">
                    <el-select v-model="valueText" placeholder="请选择" style="width:200px" @change="onChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item" v-if="permissionType1">
                <div class="item_l item_l_active">菜单列表:</div>
                <div class="item_r">
                    <el-tree style="width:200px" :data="data" show-checkbox node-key="id" ref="tree" :default-expand-all="true" :default-checked-keys="roleIds" :props="defaultProps">
                    </el-tree>
                </div>
            </div>
            <div class="item">
                <div class="item_l item_l_active1">
                    <el-button @click="getCheckedKeys" type="primary">确定</el-button>
                    <el-button>重置</el-button>
                </div>
            </div>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible1" width="20%" :before-close="handleClose">
        <div class="menu">

            <div class="item">
                <div class="item_l">权限名称:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="permissionName" placeholder="请输入权限名称"></el-input>
                </div>
            </div>
            <div class="item">
                <div class="item_l">权限类别:</div>
                <div class="item_r">
                    <el-select v-model="valueText1" placeholder="请选择" style="width:200px" @change="onChange1">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="item" v-if="permissionType">
                <div class="item_l item_l_active">菜单列表:</div>
                <div class="item_r">
                    <el-tree style="width:200px" :data="dataActive" show-checkbox node-key="id" ref="tree1" :default-expand-all="true" :props="defaultProps">
                    </el-tree>
                </div>
            </div>
            <div class="item">
                <div class="item_l item_l_active1">
                    <el-button @click="getCheckedKeyAdd" type="primary">确定</el-button>
                    <el-button>重置</el-button>
                </div>
            </div>
        </div>
    </el-dialog>

</div>
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
    menulistfortree,
    rolelist,
    roleedit,
    roleinsert,
    roledelete,
    roleupdate
} from '../../api/api';
export default {
    data() {
        return {
            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible2: true,
            permissionName: "",
            permissionName1: "",

            permissionType: true,
            permissionType1: true,
            data: [],
            dataActive: [],
            options: [{
                    value: 1,
                    label: "超级管理员"
                },
                {
                    value: 2,
                    label: "自定义管理员"
                }
            ],

            defaultProps: {
                children: 'children',
                label: 'label'
            },
            valueType: 2,
            valueType1: 2,
            valueText: "",
            valueText1: "自定义权限",
            options: [{
                value: '2',
                label: '自定义类别'
            }, {
                value: '1',
                label: '超级管理员'
            }, ],
            rowHeader: [
                // 未做任何格式化处理的数据
                {
                    prop: "id",
                    label: "ID"
                },
                {
                    prop: "name",
                    label: "用户名"
                },
                {
                    prop: "role",
                    label: "所属权限"
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
            roleIds: [],
            roleIdsActive: '',
            userId: "",
            userName: "",
            logining: false,
            ruleForm2: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                role_id: 0,

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
                ]
            },
            checked: true

        };
    },
    mounted: function () {
        this.queryInfo()
        this.queryUserList()

    },
    methods: {
        onChange(val) {
            this.valueType = val
            if (val == "1") {
                this.permissionType1 = false
            } else {
                this.permissionType1 = true
            }
        },
        onChange1(val) {
            this.valueType1 = val
            if (val == "1") {
                this.permissionType = false
            } else {
                this.permissionType = true
            }
        },
        queryUserList() {
            let param = new Object()
            param.page = this.pager.page - 1
            rolelist(param)
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
        queryInfo() {

        },
        getCheckedNodes() {},
        getCheckedKeys() {

            this.dialogVisible = false
            let param = new Object()
            param.id = this.userId
            if (this.valueType == '2') {
                param.role = this.$refs.tree.getCheckedKeys().join(",")
            } else {
                param.role = ""
            }
            param.type = parseInt(this.valueType)
            //param.role = this.$refs.tree.getCheckedKeys().join(",")

            param.name = this.userName
       
            roleupdate(param).then(res => {
                if (res.status == 0) {
                    this.$message({
                        message: "编辑成功",
                        type: "success"
                    })
                    this.queryUserList()
                } else {
                    this.$message({
                        message: `${res.err_msg}`,
                        type: "error"
                    })
                }
            }).catch(error => {

            })
        },
        getCheckedKeyAdd() {
       
            let param = new Object()
            param.name = this.permissionName
            if (this.valueType1 == '2') {
                param.role = this.$refs.tree1.getCheckedKeys().join(",")
            } else {
                param.role = ""
            }
            param.id = this.userId
            param.type = parseInt(this.valueType1)
            roleinsert(param).then(res => {
                if (res.status == 0) {
                    this.dialogVisible1 = false
                    this.$message({
                        message: "添加成功",
                        type: "success"
                    })
                    this.queryUserList()
                } else {
                    this.dialogVisible1 = false
                    this.$message({
                        message: `${res.err_msg}`,
                        type: "error"
                    })
                }

            }).catch(error => {

            })
        },
        bindSelectedTree() {
            var that = this;

            if (that.$refs.tree) {
                that.$refs.tree.setCheckedKeys([]);
            } else {
                setTimeout(function () {
                        that.bindSelectedTree()
                    },
                    500)
            }
        },
        bindSelectedTree1() {
            var that = this;

            if (that.$refs.tree1) {
                that.$refs.tree1.setCheckedKeys([]);
            } else {
                setTimeout(function () {
                        that.bindSelectedTree1()
                    },
                    500)
            }
        },
        handleButton(val, rows) {
            let setType = val
            console.log(rows)
            // this.$forceUpdate()
            if (setType == "edit") {
                this.permissionName1 = rows.name
                this.valueType1 = rows.type
                if (rows.type == 1) {
                    this.valueText = "超级管理员"
                } else {
                    this.valueText = "自定义权限"
                }
                this.dialogVisible = true
                let param = new Object()
                param.id = "1"
                menulistfortree(param).then(res => {
                    console.log(res)
                    if (res.status == 0) {
                        this.bindSelectedTree()
                        this.roleIds = []
                        this.userId = rows.id
                        this.userName = rows.name
                        this.roleIds = (rows.role).split(",")
                        this.roleIdsActive = rows.role
                        this.data = res.msg
                        this.data = JSON.parse(JSON.stringify(this.data).replace(/"name"/g, "\"label\""))
                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    }

                }).catch(error => {

                })

            } else {
                let param = new Object()
                param.id = rows.id
                this.$confirm('确定要改权限吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    roledelete(param).then(res => {
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
        addAuthority() {
            this.dialogVisible1 = true
            let param = new Object()
            param.id = "1"
            menulistfortree(param).then(res => {
                console.log(res)
                this.dataActive = res.msg
                this.dataActive = JSON.parse(JSON.stringify(this.dataActive).replace(/"name"/g, "\"label\""))
            }).catch(error => {

            })
        }

    },
    components: {
        tableBarActive3: tableBarActive3,
        pageNation: pageNation
    }
};
</script>

<style lang="less">
.setmenu {
    .el-dialog__body {
        padding: 10px;
    }

    .title {
        width: 100%;
        text-align: center;
    }

    .el-dialog__body {
        padding: 10px 20px;
    }
}

.menu {
    width: 100%;
    display: flex;

    align-items: center;
    flex-flow: column;
    justify-content: flex-start;
    //margin: 50px;
    margin-top: 0px;

    .item {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        margin-top: 10px;

        .item_l {
            display: flex;
            justify-content: center;
            align-items: center;

            &.item_l_active {
                align-items: flex-start;
            }

            &.item_l_active1 {
                align-items: center;
            }
        }

        .item_r {
            margin-left: 20px;
        }
    }

}

.setmenu {
    .adduserss {
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
