<template>
  <div class="vode-result">
    <ranking-chart :chartData="chartData"></ranking-chart>
  </div>
</template>

<script>
import Player from '@/models/Player';
import RankingChart from '../components/RankingChart';

export default {
  components: {
    RankingChart
  },

  data() {
    return {
      players: [],
      chartData: {}
    };
  },

  mounted() {
    Player.findAll().then((players) => {
      this.players = players;
      this.updateChartData();
    });
  },

  methods: {
    updateChartData() {
      this.chartData = {
        labels: this.players.map((player) => {
          return player.name;
        }),
        datasets: [
          {
            backgroundColor: this.players.map((player) => {
              return player.score() >= 0 ? '#44A4F2' : '#FC582F';
            }),
            data: this.players.map((player) => {
              return player.score();
            })
          }
        ]
      };
    },

    _findPlayerById(id) {
      return this.players.find((player) => {
        return player.id == id;
      });
    }
  },

  sockets: {
    'player/update'(json) {
        const player = this._findPlayerById(json.id);
        player.goodCount = json.goodCount;
        player.badCount = json.badCount;
        this.updateChartData();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
