import { Bar, mixins } from 'vue-chartjs';

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  data: function() {
    return {
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'スコア結果'
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
