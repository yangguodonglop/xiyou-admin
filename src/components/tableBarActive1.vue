<template>
<el-table border :data="tableData" ref="table" style="width: 100%" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAll" id="rebateSetTable">
    <el-table-column type="selection" width="55" v-if="clomnSelection"> </el-table-column>
    <el-table-column v-for="(item,index) in rowHeader" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
    </el-table-column>
    <el-table-column :label="tableOption.label" :width="tableOption.width">
        <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-button @click="toOperating(scope.row)" type="primary" size="small">{{ scope.row.status=='正常'?'冻结':'解冻'}}</el-button>
            <!-- <el-button @click="toChange(scope.row)" type="primary" size="small">解冻</el-button> -->
            <!-- <el-button size="mini" v-for="(item,index) in tableOption.options" :key="index" :type="item.type" @click="handleButton(item.methods,scope.row)">
                {{item.label}}
            </el-button> -->
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    props: {
        rowHeader: {
            type: Array,
            default: () => {}
        },
        tableData: {
            type: Array,
            default: () => {}
        },
        tableOption: {
            type: Object,
            default: () => {}
        },
        clomnSelection: {
            type: String,
            default: () => {

            }
        },
        reserveselection: {
            type: Boolean,
            default: () => {

            }
        }
    },
    data() {
        return {

        };
    },
    mounted: function () {

    },
    methods: {
        clearSelection() {
            this.$refs.table.clearSelection();
        },
        toggleRowSelection(a, b) {
            this.$refs.table.toggleRowSelection(a, b);
        },

        toOperating(val) {
            this.$emit('toOperating', val)
        },
        toChange(val) {
            this.$emit('toChange', val)
        },
        toRelease(val) {
            this.$emit('toRelease', val)
        },

        toSet(val) {
            this.$emit('toSet', val)
        },

        handleSelectionChange(val) {
            //  this.multipleSelection = val;
            this.$emit('handleSelectionChange', val)
        },
         selectCheckBox(a,b) {
            //  this.multipleSelection = val;
            this.$emit('selectCheckBox', {a,b})
        },
          selectAll(a) {
            //  this.multipleSelection = val;
            this.$emit('selectAll', a)
        }
    }
};
</script>

<style lang="less">
.el-table {
    font-size: 12px;
}

.el-table th.gutter {
    display: table-cell !important;
}
</style>
