<template>
  <div>
    <div
      style="width:100%;height:200px;margin-top:0px;"
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
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
        'test' : [111]
    };
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  mounted: function() {
    // const vm = this;
    // vm.$nextTick(() => {
    //   vm.drawChart();
    // });
    console.log(this.chartData)
    this.drawChart1();
  },
  methods: {
    drawChart1() {
        console.log(this.chartData)
      console.log(1);
      const vm = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.echarts));
      // 绘制图表
      myChart.setOption({
        title: {
          //text: '麻花播放器',
          text: this.titlective,

          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            }
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data:this.chartData
            //     data: [{
            //             value: 5000,
            //             name: '1.1.1版'
            //         },
            //         {
            //             value: 1000,
            //             name: '1.1.2版'
            //         },
            //         {
            //             value: 3000,
            //             name: '1.1.3版'
            //         }

            //     ]
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>
