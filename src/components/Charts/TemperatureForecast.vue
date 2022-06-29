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
import { defineComponent, inject, computed } from 'vue';
import ApexChart from 'vue3-apexcharts';

export const LineChart = defineComponent({
    name: 'LineChart',
    components: {
        ApexChart
    },

    setup() {
        const filteredLineGraphData = inject('filteredLineGraphData');

        const xAxisD = computed(() => filteredLineGraphData.xAxis);
        const yAxisD = computed(() => filteredLineGraphData.yAxis);
        
        const chartData = computed(() => {
            return [{
                name: "Temperatuur",
                data: yAxisD.value,
            }]});


          const chartOptions = computed(() => {
            return {
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
              categories: xAxisD.value,
            }
          };
          })
          return {chartData, chartOptions};
    }
});
export default LineChart;
</script>