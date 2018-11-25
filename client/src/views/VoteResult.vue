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
    });
  },

  methods: {

  },

  watch: {
    players () {
      console.log("change player");
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
