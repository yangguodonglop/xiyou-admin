<template>
  <div>
    <div
      style="width:90%;height:400px;margin:30px auto;background:#999999;"
      :id="echarts"
      class="echarts"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    titlective: {
      type: String,
      default: () => ""
    },
    xAxisData: {
      type: Array,
      default: () => []
    },
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  mounted: function() {
    this.drawChart();
  },
  methods: {
    drawChart(arr1, arr2) {
  
      const vm = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(this.echarts));
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.titlective,
          //text: this.$t('myincome.item_nav5'),

          x: "center",
          top: "10px"
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //     data: ["在线节点数"]
        // },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ["2019-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06", "2019-07"]
          data: arr1
        },
        yAxis: {
          type: "value"
          // axisLabel: {
          //     formatter: "{value}("
          // }
        },
        series: [
          {
            // name: "当天收益",
            text: "当天收益",
            type: "line",
            stack: "总量",
            //data: ["0", "11.39", "0", "0", "12", "111", "10"]
            data: arr2
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>
