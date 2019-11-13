<template>
<div>
    <div class="main_top">
        <div class="main_top_title">
            <div>服务器备用地址配置</div>
            <el-button @click="onEdit" class="editing" type="primary">编辑</el-button>
        </div>
        <div class="main-con">
            <div class="item">
                <div class="item_title">备用域名:</div>
                <div class="input_con">
                    <div class="item_input" v-for="(item,i) of items" :key="i">
                        <el-input type="text" placeholder="请输入备用域名" v-model="items[i].value" v-on:input="onChange" :disabled="disabledInputStatus"></el-input>
                        <el-button class="input-button"  @click="deleteRow(i)" v-if="btnType">删除</el-button>
                        <div style="color:red" class="warns" v-if="items[i].status">请输入备用域名</div>
                    </div>

                    <el-button @click="onAdd" class="add-btn" v-if="btnType">添加</el-button>
                </div>
            </div>
            <div class="item">
                <div class="item_title">备用IP:</div>
                <div class="input_con">
                    <div class="item_input" v-for="(item,i) of items1" :key="i">
                        <el-input type="text" placeholder="请输入备用IP" v-model="items1[i].value" :disabled="disabledInputStatus"></el-input>
                        <el-button class="input-button"  @click="deleteRow1(i)" v-if="btnType">删除</el-button>
                        <div style="color:red" class="warns" v-if="items1[i].status">请输入备用IP</div>

                    </div>
                    <el-button @click="onAdd1" v-if="btnType" class="add-btn">添加</el-button>
                </div>
            </div>
            <div class="item">
                <div class="item_title">备用Blog:</div>
                <div class="input_con">
                    <div class="item_input" v-for="(item,i) of items2" :key="i">
                        <el-input type="text" placeholder="请输入备用Blog" v-model="items2[i].value" :disabled="disabledInputStatus"></el-input>
                        <el-button class="input-button"  @click="deleteRow2(i)" v-if="btnType">删除</el-button>
                        <div style="color:red" class="warns" v-if="items2[i].status">请输入备用Blog</div>

                    </div>
                    <el-button @click="onAdd2" v-if="btnType" class="add-btn">添加</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="main_bottom main_top">
        <div class="main_top_title">
            <div>超级管理节点地址配置</div>
        </div>
        <div class="main-con">
            <div class="item">
                <div class="item_title">节点地址:</div>
                <div class="input_con">
                    <div class="item_input" v-for="(item,i) of items3" :key="i">
                        <el-input type="text" placeholder="请输入节点地址" v-model="items3[i].value" :disabled="disabledInputStatus"></el-input>
                        <el-button class="input-button"  @click="deleteRow3(i)" v-if="btnType">删除</el-button>
                        <div style="color:red" class="warns" v-if="items3[i].status">请输入节点地址</div>

                    </div>
                    <el-button @click="onAdd3" v-if="btnType" class="add-btn">添加</el-button>
                </div>
            </div>
        </div>
    </div> -->
    <div class="main-save">
        <el-button type="primary" @click="onSave" :disabled="disabledStatus" v-if="btnType">保存设置</el-button>
    </div>
</div>
</template>

<script>
import {
    modify_domain_list,
    query_domain_list
} from "../../api/api.js"
export default {
    data() {
        return {
            items: [],
            items1: [],
            items2: [],
            items3: [],
            btnType: false,
            disabledStatus: true,
            disabledInputStatus:true,
            backUpDomain_list: [],
            backUpIP_list: [],
            backUpBlogDomain_list: [],
            smng_list: []

        }
    },
    mounted: function () {
        this.queryInfo()
    },

    methods: {
        onChange() {

            this.disabledStatus = false

        },
        queryInfo() {
            let param = new Object()
            param.number = "213"
            query_domain_list(param).then(res => {
                if (res.data.domain_info.backUpDomain_list) {
                    let tempArr = []
                    let nowArr = res.data.domain_info.backUpDomain_list
                    for (var i = 0; i < nowArr.length; i++) {
                        let obj = {
                            value: nowArr[i],
                            status: false
                        }
                        tempArr.push(obj)
                    }
                    this.items = []
                    this.items = tempArr
                }
                if (res.data.domain_info.backUpIP_list) {
                    let tempArr = []
                    let nowArr = res.data.domain_info.backUpIP_list
                    for (var i = 0; i < nowArr.length; i++) {
                        let obj = {
                            value: nowArr[i],
                            status: false
                        }
                        tempArr.push(obj)
                    }
                    this.items1 = []
                    this.items1 = tempArr
                }
                if (res.data.domain_info.backUpBlogDomain_list) {
                    let tempArr = []
                    let nowArr = res.data.domain_info.backUpBlogDomain_list
                    for (var i = 0; i < nowArr.length; i++) {
                        let obj = {
                            value: nowArr[i],
                            status: false
                        }
                        tempArr.push(obj)
                    }
                    this.items2 = []
                    this.items2 = tempArr
                }
                if (res.data.domain_info.smng_list) {
                    let tempArr = []
                    let nowArr = res.data.domain_info.smng_list
                    for (var i = 0; i < nowArr.length; i++) {
                        let obj = {
                            value: nowArr[i],
                            status: false
                        }
                        tempArr.push(obj)
                    }
                    this.items3 = []
                    this.items3 = tempArr
                }

            }).catch(err => { 

            })
        },
        onAdd() {
            this.disabledStatus = false
            if (this.items.length > 9) {
                return false
            } else {
                this.items.push({
                    value: '',
                    status: false
                });

            }
            //this.showType=true

        },
        deleteRow(index) {
            this.disabledStatus = false
            this.items.splice(index, 1);

        },
        onAdd1() {
            this.disabledStatus = false
            if (this.items1.length > 9) {
                return false
            } else {
                this.items1.push({
                    value: '',
                    status: false
                });
            }

        },
        deleteRow1(index) {
            this.disabledStatus = false
            this.items1.splice(index, 1);
        },
        onAdd2() {

            this.disabledStatus = false
            if (this.items2.length > 9) {
                return false
            } else {
                this.items2.push({

                    value: '',
                    status: false
                });
            }

        },
        deleteRow2(index) {
            this.disabledStatus = false
            this.items2.splice(index, 1);
        },
        onAdd3() {
            this.disabledStatus = false
            if (this.items3.length > 9) {
                return false
            } else {
                this.items3.push({
                    value: '',
                    status: false
                });
            }

        },
        deleteRow3(index) {
            this.disabledStatus = false
            this.items3.splice(index, 1);
        },
        onSave() {

            let nowArr = []
            let nowArr1 = []
            let nowArr2 = []
            let nowArr3 = []
            for (var j = 0; j < this.items.length; j++) {
                nowArr.push(this.items[j].value)

                if (this.items[j].value == "") {
                    this.items[j].status = true
                    return false
                } else {
                    this.items[j].status = false
                }
            }
            this.backUpDomain_list = nowArr
            for (var k = 0; k < this.items1.length; k++) {
                nowArr1.push(this.items1[k].value)
                if (this.items1[k].value == "") {
                    this.items1[k].status = true
                    return false
                } else {
                    this.items1[k].status = false
                }
            }
            this.backUpIP_list = nowArr1
            for (var h = 0; h < this.items2.length; h++) {
                nowArr2.push(this.items2[h].value)
                if (this.items2[h].value == "") {
                    this.items2[h].status = true
                    return false
                } else {
                    this.items2[h].status = false
                }
            }
            this.backUpBlogDomain_list = nowArr2
            for (var n = 0; n < this.items3.length; n++) {
                nowArr3.push(this.items3[n].value)
                if (this.items3[n].value == "") {
                    this.items3[n].status = true
                    return false
                } else {
                    this.items3[n].status = false
                }
            }
            this.smng_list = nowArr3
            let param = new Object()
            let domain_info = new Object
            domain_info.backUpDomain_list = this.backUpDomain_list
            domain_info.backUpIP_list = this.backUpIP_list
            domain_info.backUpBlogDomain_list = this.backUpBlogDomain_list
            domain_info.smng_list = this.smng_list
            param.domain_info = domain_info
            console.log(param)
            modify_domain_list(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                }
                this.queryInfo()
                this.disabledStatus = true
                this.disabledInputStatus=true
                this.btnType = false
            }).catch(error => {
                this.$message({
                    message: `${res.err_msg}`,
                    type: "error"
                });

            })
        },
        onEdit() {
            this.btnType = true
            this.disabledInputStatus=false
        }

    }
}
</script>

<style lang="less" scoped>
.main_top {
    width: 100%;
    min-height: 300px;
    background: #f2f2f2;
    margin-top: 50px;
    overflow: hidden;
    padding-bottom: 10px;
    .el-input__inner{
        height: 35px !important;
        line-height: 35px !important;
  
    }   

    .main_top_title {
        display: flex;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0px 0px 30px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 20px;

        .editing {
            cursor: pointer;
            margin-top: 20px;
            margin-right: 20px;
        }
    }

    &.main_bottom {
        .main-con {
            display: flex;
            justify-content: center;
        }
    }

    .main-con {
        display: flex;
        justify-content: space-between;
        // align-items: center;

        .item {
            display: flex;
            width: 500px;
            justify-content: center;

            .warns {
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
            }

            .item_title {
                height: 45px;
                line-height: 45px;
                color: #606266;
            }

            .input_con {
                .add-btn {
                    margin-left: 95px;
                    margin-top: 5px;
                    padding: 8px 20px;
                }
            }

            .item_input {
                margin-left: 10px;
                margin-top: 5px;
                display: flex;
                justify-content: flex-start;

                .el-input {
                    width: 250px;
                }
 
                .el-input__inner {
                    height: 25px;
                    text-indent: 10px;
                    width: 230px;
                    background: red;

                }

                .input-button {
                    margin-left: 20px;

                    &.el-button {
                        padding: 8px 15px;
                        color: red;

                    }
                }
            }
        }
    }
}

.main_bottom {
    width: 100%;
    background: #f2f2f2;
    margin-top: 50px;
    min-height: 300px;
    overflow: hidden;
}

.main-save {
    width: 100%;
    height: 100px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
