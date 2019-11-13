<template>
<div class="custom-tree-container editmeun">
    <div class="block">
        <div class="title">编辑菜单权限:</div>
        <div>
            <el-button type="text" style="margin-left:20px;" size="mini" @click="() => appendActive()">
                添加
            </el-button>
            <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="() => append(data)">
                            添加
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                            删除
                        </el-button>
                        <el-button type="text" size="mini" @click="() => edit(data)">
                            编辑
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
    </div>
    <el-dialog :visible.sync="dialogVisible1" width="20%" :before-close="handleClose">
        <div class="menu">

            <div class="item">
                <div class="item_l">菜单路径:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="pathName" placeholder="请输入菜单路径"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单组件:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="componentName" placeholder="请输入菜单组件"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单名称:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="muenName" placeholder="请输入菜单名称"></el-input>
                </div>
            </div>
            <div class="item">
                <div class="item_l item_l_active1">
                    <el-button @click="menuInsert" type="primary">确定</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="20%" :before-close="handleClose">
        <div class="menu">

            <div class="item">
                <div class="item_l">菜单路径:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="pathName1" placeholder="请输入菜单路径"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单组件:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="componentName1" placeholder="请输入菜单组件"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单名称:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="muenName1" placeholder="请输入菜单名称"></el-input>
                </div>
            </div>
            <div class="item">
                <div class="item_l item_l_active1">
                    <el-button @click="menuEdit" type="primary">确定</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="20%" :before-close="handleClose">
        <div class="menu">

            <div class="item">
                <div class="item_l">菜单路径:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="pathName2" placeholder="请输入菜单路径"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单组件:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="componentName2" placeholder="请输入菜单组件"></el-input>
                </div>
            </div>

            <div class="item">
                <div class="item_l">菜单名称:</div>
                <div class="item_r">
                    <el-input style="width:200px" v-model="muenName2" placeholder="请输入菜单名称"></el-input>
                </div>
            </div>
            <div class="item">
                <div class="item_l item_l_active1">
                    <el-button @click="menuInsertActive" type="primary">确定</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    menulistfortree,
    menuupdate,
    menuinsert,
    menudelete

} from '../../api/api';
let id = 1000;

export default {
    data() {

        const data = [];
        return {
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,

            data: JSON.parse(JSON.stringify(data)),
            data: JSON.parse(JSON.stringify(data)),
            pathName: "",
            componentName: "",
            muenName: "",
            pid: "",
            pathName1: "",
            componentName1: "",
            muenName1: "",
            pid1: "",
            id1: "",
                 pathName2: "",
            componentName2: "",
            muenName2: "",
            pid2: "",

        }
    },
    mounted: function () {
        this.queryInfo()
    },
    methods: {
        queryInfo() {
            let param = new Object()
            param.id = "1"
            menulistfortree(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.data = JSON.parse(JSON.stringify(res.msg).replace(/"name"/g, "\"label\""))

                    // this.bindSelectedTree()
                    // this.roleIds = []
                    // this.userId = rows.id
                    // this.userName = rows.name
                    // this.roleIds = (rows.role).split(",")
                    // this.roleIdsActive = rows.role
                    // this.data = res.msg
                    // this.data = JSON.parse(JSON.stringify(this.data).replace(/"name"/g, "\"label\""))
                } else {
                    this.$message({
                        message: `${res.err_msg}`,
                        type: "error"
                    })
                }

            }).catch(error => {

            })
        },
        append(data) {
            this.dialogVisible1 = true
            console.log(data)
            this.pid = data.id

            return false
            const newChild = {
                id: id++,
                label: 'testtest',
                children: []
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        appendActive(data) {
            this.dialogVisible3 = true
    

            return false
            const newChild = {
                id: id++,
                label: 'testtest',
                children: []
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            console.log(data)
            let param = new Object()
            param.id = data.id
            menudelete(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    })
                    this.dialogVisible1 = false
                    this.queryInfo()

                } else {
                    this.$message({
                        message: `${res.msg}`,
                        type: "error"
                    })
                }
            }).catch(error => {

            })
            return false
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        //编辑菜单
        edit(data) {
            this.dialogVisible2 = true
            console.log(data)
            this.pathName1 = data.path
            this.componentName1 = data.component
            this.muenName1 = data.label
            this.pid1 = data.pid
            this.id1 = data.id
            // pid1:""

            return false
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        //新增菜单
        menuInsert() {
            let param = new Object()
            param.pid = this.pid
            param.path = this.pathName
            param.component = this.componentName
            param.name = this.muenName
            param.icon = "el-icon-menu"

            menuinsert(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        message: "新增成功",
                        type: "success"
                    })
                    this.dialogVisible1 = false
                    this.queryInfo()

                } else {
                    this.$message({
                        message: `${res.msg}`,
                        type: "error"
                    })
                }
            }).catch(error => {

            })
        },
        //最外层添加菜单
        menuInsertActive() {
            let param = new Object()
            param.pid = 0
            param.path = this.pathName2
            param.component = this.componentName2
            param.name = this.muenName2
            param.icon = "el-icon-menu"

            menuinsert(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        message: "新增成功",
                        type: "success"
                    })
                    this.dialogVisible3 = false
                    this.queryInfo()

                } else {
                    this.$message({
                        message: `${res.msg}`,
                        type: "error"
                    })
                }
            }).catch(error => {

            })
        },
        menuEdit() {
            let param = new Object()
            param.id = this.id1
            param.pid = this.pid1
            param.path = this.pathName1
            param.component = this.componentName1
            param.name = this.muenName1
            param.icon = "el-icon-menu"
            menuupdate(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    })
                    this.dialogVisible2 = false
                    this.queryInfo()

                } else {
                    this.$message({
                        message: `${res.msg}`,
                        type: "error"
                    })
                }
            }).catch(error => {

            })

        },

        renderContent(h, {
            node,
            data,
            store
        }) {
            return (
                `<span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
              <el-button size="mini" type="text" on-click={ () => this.edit(data) }>编辑</el-button>
            </span>
          </span>`)
        }
    }
};
</script>

<style lang="less">
.editmeun {
    .block {
        display: flex;
        justify-content: flex-start;
        flex-flow: row;
        margin: 30px;

        .title {
            font-weight: bold;
            font-size: 14px;
            padding-top: 3px;
        }
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>
