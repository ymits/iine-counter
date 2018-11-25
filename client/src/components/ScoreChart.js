import { Doughnut, mixins } from 'vue-chartjs';

export default {
    extends: Doughnut,
    mixins: [mixins.reactiveData],
    props: {
      goodCount: {
        type: Number,
        required: true,
      },
      badCount: {
        type: Number,
        required: true,
      },
    },
    data: function() {
      return {
        options: {
          cutoutPercentage: 70
        }
      }
    },
    watch: {
      goodCount: function() {
        this.updateChartData()
      },
      badCount: function() {
        this.updateChartData()
      }
    },
    methods: {
      updateChartData() {
        const newChartData = Object.assign({}, this.chartData);
        newChartData.datasets[0].data = [this.goodCount, this.badCount];
        this.chartData = newChartData;
      },
    },
    mounted () {
        this.chartData = {
          labels: ['いいね', 'よくないね'],
          datasets: [{
            data: [this.goodCount, this.badCount],
            backgroundColor: ['#44A4F2','#FC582F']
          }]
        };
    }
}
