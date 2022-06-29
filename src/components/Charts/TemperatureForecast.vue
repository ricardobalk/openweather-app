<template>
    <div class="chart">
        <ApexChart width="600" :options="chartOptions" :series="chartData" />
    </div>
</template>

<style>
.chart {
    display: flex;
    justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import ApexChart from 'vue3-apexcharts';

export const LineChart = defineComponent({
    name: 'LineChart',
    components: {
        ApexChart
    },
    props: {
      xAxis: {
        type: Array,
        required: true,
        default: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      },
      yAxis: {
        type: Array,
        required: true,
        default: [20, 21, 25, 23, 23, 24, 23, 20, 18],
      }
    },
    setup(props) {
        const chartData = [{
              name: "Temperatuur",
              data: props.yAxis
          }];
          const chartOptions = {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Temperatuursvoorspelling (°C)',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: props.xAxis,
            }
          };
          return {chartData, chartOptions};
    }
});
export default LineChart;
</script>