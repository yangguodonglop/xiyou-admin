<template>
  <div>
    <div class="index_top">
      <div class="index_top_title">
        <el-form ref="form" :model="form">
          <el-form-item label="渠道选择">
            <el-select v-model="value" placeholder="请选择" @change="onChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span @click="goLink">查看渠道分布详情</span>
      </div>
      <el-row type="flex" class="row_active">
        <el-col
          :span="6"
          v-for="(item,index) in chartDataActive"
          :key="item"
          style="border:1px solid #999999;margin-left:10px;"
        >
          <EchartsCoponent
            :titlective="titleactive[index]"
            :chartData="item"
          ></EchartsCoponent>
        </el-col>
      </el-row>
    </div>
    <div class="index_bottom">
      <div class="index_top_title index_top_title_active">
        <el-tabs v-model="tabPosition" type="card" @tab-click="handleClick">
          <el-tab-pane label="近7天" name="top"></el-tab-pane>
          <el-tab-pane label="近30天" name="right"></el-tab-pane>
        </el-tabs>
        <span @click="goLink1" style="float:right">查看渠道分布详情</span>
      </div>
      <div class="index_bottom_con" style="border:1px solid #999999;">
        <div class="echars_div">
          <EchartsComponentLine
            :titlective="titleLineActive[0]"
            :xAxisData="xAxisData1"
            :seriesData="seriesData1"
            ref="echart"
          ></EchartsComponentLine>
        </div>
      </div>
      <div class="index_bottom_con" style="border:1px solid #999999;float:right">
        <div class="echars_div">
          <EchartsComponentLine
            :titlective="titleLineActive[1]"
            :xAxisData="xAxisData2"
            :seriesData="seriesData2"
            ref="echart1"
          ></EchartsComponentLine>
        </div>
      </div>
      <div class="index_bottom_con" style="border:1px solid #999999;">
        <div class="echars_div">
          <EchartsComponentLine
            :titlective="titleLineActive[2]"
            :xAxisData="xAxisData3"
            :seriesData="seriesData3"
            ref="echart2"
          ></EchartsComponentLine>
        </div>
      </div>
      <div class="index_bottom_con" style="border:1px solid #999999;float:right">
        <div class="echars_div">
          <EchartsComponentLine
            :titlective="titleLineActive[3]"
            :xAxisData="xAxisData4"
            :seriesData="seriesData4"
            ref="echart3"
          ></EchartsComponentLine>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EchartsCoponent from "../../components/EchartsComponent";
import EchartsComponentLine from "../../components/EchartsComponentLine";
import { query_3rd_stream_overview } from "../../api/api.js";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      tabPosition: "top",
      tabPosition1: "top1",
      tabPosition2: "top2",
      tabPosition3: "top3",
      item_echarslength: 4,
      titleactive: ["存储GB", "存储文件(个)", "下载流量(GB)", "下载次数"],
      titleLineActive: [
        "存储流量(GB)",
        "存储文件数",
        "下载流量(GB)",
        "下载文件数"
      ],
      options: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "麻花",
          label: "麻花"
        },
        {
          value: "黄瓜",
          label: "黄瓜"
        },
        {
          value: "茄子",
          label: "茄子"
        }
      ],
      value: "全部",
      xAxisData1: [],
      seriesData1: [],
      xAxisData2: [],
      seriesData2: [],
      xAxisData3: [],
      seriesData3: [],
      xAxisData4: [],
      seriesData4: [],
      chartDataActive: [
        // [
        //   {
        //     value: 5000,
        //     name: "1.1.1版"
        //   },
        //   {
        //     value: 1000,
        //     name: "1.1.2版"
        //   },
        //   {
        //     value: 3000,
        //     name: "1.1.3版"
        //   }
        // ],
        // [
        //   {
        //     value: 5000,
        //     name: "1.1.1.1版"
        //   },
        //   {
        //     value: 1000,
        //     name: "1.1.2.2版"
        //   },
        //   {
        //     value: 3000,
        //     name: "1.1.3.2版"
        //   }
        // ],
        // [
        //   {
        //     value: 5000,
        //     name: "2.1.1.1版"
        //   },
        //   {
        //     value: 1000,
        //     name: "2.1.2.2版"
        //   },
        //   {
        //     value: 3000,
        //     name: "2.1.3.2版"
        //   }
        // ],
        // [
        //   {
        //     value: 5000,
        //     name: "3.1.1.1版"
        //   },
        //   {
        //     value: 1000,
        //     name: "3.1.2.2版"
        //   },
        //   {
        //     value: 3000,
        //     name: "3.1.3.2版"
        //   }
        // ]
      ]
    };
  },
  mounted() {
    this.queryInfo(7);
  },
  methods: {
    onChange(item) {
      console.log(item);
      this.value = item;
    },

    handleClick(tab, event) {
      console.log(tab);
      if (tab.label == "top") {
        this.queryInfo(7);
      } else {
        this.queryInfo(30);
      }
    },
    queryInfo(num) {
      let param = new Object();
      (param.app_id = "*"), (param.time_span = num);
      query_3rd_stream_overview(param)
        .then(res => {
          console.log(res);
          if (res.status == 0 && res.err_code == 0) {
            if (res.data.total_fetch_cnt_curve) {
              let tempArr = res.data.total_fetch_cnt_curve;
              let tempArr1 = [];
              let tempArr2 = [];
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr1.push(this.common.getTimes(tempArr[i][0] * 1000));
                tempArr2.push(tempArr[i][1]);
              }
              this.xAxisData1 = tempArr1;
              this.seriesData1 = tempArr2;
              this.$refs.echart.drawChart(tempArr1, tempArr2);
            } else {
              this.xAxisData1 = [];
              this.seriesData1 = [];
            }
            if (res.data.total_fetch_size_curve) {
              let tempArr = res.data.total_fetch_size_curve;
              let tempArr1 = [];
              let tempArr2 = [];
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr1.push(this.common.getTimes(tempArr[i][0] * 1000));
                tempArr2.push(tempArr[i][1]);
              }
              this.xAxisData2 = tempArr1;
              this.seriesData2 = tempArr2;
              this.$refs.echart1.drawChart(tempArr1, tempArr2);
            } else {
              this.xAxisData2 = [];
              this.seriesData2 = [];
            }
            if (res.data.total_file_cnt_curve) {
              let tempArr = res.data.total_file_cnt_curve;
              let tempArr1 = [];
              let tempArr2 = [];
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr1.push(this.common.getTimes(tempArr[i][0] * 1000));
                tempArr2.push(tempArr[i][1]);
              }
              this.xAxisData3 = tempArr1;
              this.seriesData3 = tempArr2;
              this.$refs.echart2.drawChart(tempArr1, tempArr2);
            } else {
              this.xAxisData3 = [];
              this.seriesData3 = [];
            }
            if (res.data.total_store_size_curve) {
              let tempArr = res.data.total_store_size_curve;
              let tempArr1 = [];
              let tempArr2 = [];
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr1.push(this.common.getTimes(tempArr[i][0] * 1000));
                tempArr2.push(tempArr[i][1]);
              }
              this.xAxisData4 = tempArr1;
              this.seriesData4 = tempArr2;

              this.$refs.echart3.drawChart(tempArr1, tempArr2);
            } else {
              this.xAxisData4 = [];
              this.seriesData4 = [];
            }

            /**
             *处理饼图数据 2019/9/25 （未完成）
             */
            if (res.data.total_fetch_cnt_piechart) {
              let tempArr = res.data.total_fetch_cnt_piechart;
              let tempArr3 = [];
             
              for (var i = 0; i < tempArr.length; i++) {
                   let tempArr4 = {};
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr4.name = tempArr[i][0];
                tempArr4.value = tempArr[i][1];
                tempArr3.push(tempArr4);
              }
            //   console.log(tempArr3)
            //   console.log("&&&&&&&")
            //   console.log(this.$refs.echartss.test)
              this.chartDataActive.push(tempArr3);
              
             
            } else {
              this.chartDataActive.push([]);
            }
            if (res.data.total_fetch_size_piechart) {
              let tempArr = res.data.total_fetch_size_piechart;
              let tempArr3 = [];
            
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                  let tempArr4 = {};
                tempArr4.name = tempArr[i][0];
                tempArr4.value = tempArr[i][1];
                tempArr3.push(tempArr4);
              }
              this.chartDataActive.push(tempArr3);
               
            } else {
              this.chartDataActive2.push([]);
            }
            if (res.data.total_file_cnt_piechart) {
              let tempArr = res.data.total_file_cnt_piechart;
              let tempArr3 = [];
            
              for (var i = 0; i < tempArr.length; i++) {
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                  let tempArr4 = {};
                tempArr4.name = tempArr[i][0];
                tempArr4.value = tempArr[i][1];
                tempArr3.push(tempArr4);
              }
              this.chartDataActive.push(tempArr3);
               
            } else {
              this.chartDataActive.push([]);
            }
            if (res.data.total_store_size_piechart) {
              let tempArr = res.data.total_store_size_piechart;
              let tempArr3 = [];
            
              for (var i = 0; i < tempArr.length; i++) {
                    let tempArr4 = {};
                // let timeStr=this.common.getTimes((tempArr[i][0])*1000)
                tempArr4.name = tempArr[i][0];
                tempArr4.value = tempArr[i][1];
                tempArr3.push(tempArr4);
              }
              this.chartDataActive.push(tempArr3);
              
            } else {
              this.chartDataActive.push([]);
            }
             this.$refs.echartss.drawChart1();
            console.log(this.chartDataActive);
           
            
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "网络错误",
            type: "error"
          });
        });
    },
    tabChange() {},
    goLink() {
      this.$router.push({
        path: "/capacitystatistics",
        query: {
          data: this.value
        }
      });
    },
    goLink1() {
      this.$router.push({
        path: "/capacitybreakdown"
      });
    }
  },
  components: {
    EchartsCoponent: EchartsCoponent,
    EchartsComponentLine: EchartsComponentLine
  }
};
</script>

<style lang="less" scoped>
.index_top {
  width: 1600px;
  margin: 50px 0px;
  border-bottom: 5px solid #999999;
  padding-bottom: 50px;
}

.index_top_title {
  &.index_top_title_active {
    float: left;
  }

  width: 1600px;
  height: 40px;
  text-align: right;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: blue;
    cursor: pointer;
  }
}

.index_bottom {
  width: 1600px;
  margin: 50px 0px;

  .index_bottom_con {
    width: 45%;
    float: left;
    // margin-left: 20px;
    margin-top: 30px;
    padding: 30px;

    .echars_div {
      width: 100%;
      height: 400px;
      float: right;
      text-align: right;
    }

    .group_con {
      float: right;
      margin-top: 20px;
      width: 100%;
      height: 50px;
      overflow: hidden;
      display: flex;
      justify-content: flex-end;
      //   .tab_left{
      //       background: #5eaae7;
      //       border-radius: 12px;
      //   }
    }
  }
}
</style>
