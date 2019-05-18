<script>
import { PolarArea, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: PolarArea,
    mixins: [reactiveProp],

    mounted () {

    this.renderChart(this.chartData, 
    {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
    })
  },

}
</script>

