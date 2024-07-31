import { ref } from 'vue'

const useEstadisticas = () => {
  const date = ref()
  const chartData = ref()
  const chartOptions = ref()
  const labels = ref<any>([])
  const dataChar = ref<number[]>([])

  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    return {
      labels: labels.value,
      datasets: [
        {
          label: 'Ventas por dia',
          backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
          borderColor: documentStyle.getPropertyValue('--cyan-500'),
          data: dataChar.value
        }
      ]
    }
  }

  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    }
  }

  return {
    date,
    labels,
    dataChar,
    chartData,
    chartOptions,
    setChartData,
    setChartOptions
  }
}

export default useEstadisticas
