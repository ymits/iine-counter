<template>
  <v-carousel :cycle="false">
    <v-carousel-item v-for="(player,id) in players" :key="id">
      <div class="player-name">{{player.name}}</div>
      <div class="">
        <div class="">
          いいね： {{player.goodCount}}
        </div>
        <div class="">
          よくないね： {{player.badCount}}
        </div>
      </div>
      <v-layout align-center row fill-height>
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

export default {
  data() {
    return {
      players: []
    };
  },

  mounted() {
    Player.findAll().then((players) => {
      console.log(players);
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
}

</style>
