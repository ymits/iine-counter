<template>
  <v-carousel :cycle="false" style="height:100%">
    <v-carousel-item v-for="player in players" :key="player.id">
      <div class="player-name">{{player.name}}</div>
      <div class="score-chart">
        <div class="point">
          <div class="title">スコア</div>
          <div class="score">{{player.goodCount - player.badCount}}</div>
        </div>
        <score-chart :width="200" :height="200" :goodCount="player.goodCount" :badCount="player.badCount"></score-chart>
      </div>
      <v-layout align-top row>
        <v-flex xs6>
          <v-btn block large color="deep-orange" @click="clickBadBtn(player.id)">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block large color="blue" @click="clickGoodBtn(player.id)">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Player from '@/models/Player';
import ScoreChart from '../components/ScoreChart';

export default {
  components: {
    ScoreChart
  },

  data() {
    return {
      players: []
    };
  },

  mounted() {
    Player.findAll().then((players) => {
      this.players = players;
    });
  },

  methods: {
    clickGoodBtn(id) {
      const player = this._findPlayerById(id);
      player.goodCount++;
    },

    clickBadBtn(id) {
      const player = this._findPlayerById(id);
      player.badCount++;
    },

    _findPlayerById(id) {
      return this.players.find((player) => {
        return player.id == id;
      });
    }
  },

  computed: {
    playerScore () {
      return (player) => {
        return player.score();
      };
    }
  }
}
</script>

<style lang="scss" scoped>

.v-carousel {
  box-shadow: none;

  .player-name {
    font-size: 24px;
    text-align: center;
  }

  .layout .flex {
    padding: 4px;

    .v-btn {
      height: 100px;
    }
  }

  /deep/ .v-carousel__prev,
  /deep/ .v-carousel__next {
    bottom: -20px;
    z-index: 10;
    top: auto;
  }

  /deep/ .v-carousel__item {
    height: 100% !important;
  }

  .score-chart {
    position: relative;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;

    .point {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      margin-left: -100px;

      text-align: center;

      transform:translateY(-40%);

      .title {
        font-size: 24px;
      }

      .score {
        font-size: 48px;
      }
    }
  }
}

</style>
