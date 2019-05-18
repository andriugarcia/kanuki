<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],

    mounted () {
    // Overwriting base render method with actual data.
    // const background = this.content.Color + '90'
      // labels: this.content.Labels,
      // datasets: [
      //   {
      //     label: this.content.Label,
      //     backgroundColor: background,
      //     borderColor: this.content.Color,
      //     data: this.content.Data
      //   }
      // ],
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

