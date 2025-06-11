<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  labels: Array,
  datasets: Array
})

const canvas = ref(null)
let chart

const renderChart = () => {
  if (chart) chart.destroy()
  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: props.datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  })
}

watch(() => [props.labels, props.datasets], renderChart, { deep: true })
onMounted(renderChart)
</script>