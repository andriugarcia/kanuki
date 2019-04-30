<script>
// import { Bar } from 'vue-chartjs'

export default {
    // extends: Bar,
    props: [
        "content"
    ],
    mounted () {
    // Overwriting base render method with actual data.
    // this.renderChart({
    //   labels: this.content.Labels,
    //   datasets: [
    //     {
    //       label: this.content.Label,
    //       backgroundColor: this.content.Color,
    //       data: this.content.Data
    //     }
    //   ]
    // })
  }
}
</script>

