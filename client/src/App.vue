<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>いいねホイホイ</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items :class="{ 'hidden': $route.path==='/vote' }">
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/vote">Vote</v-btn>
        <v-btn flat to="/voteResult">Vote Result</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>

    <audio id="good-sound-file" preload="auto">
      <source src="good.mp3" type="audio/mp3" />
      <source src="good.wav" type="audio/wav" />
    </audio>
    <audio id="bad-sound-file" preload="auto">
      <source src="bad.mp3" type="audio/mp3" />
      <source src="bad.wav" type="audio/wav" />
    </audio>
  </v-app>
</template>

<script>
import Player from '@/models/Player';

export default {
  name: 'App',
  data() {
    return {
      goodAudio: null,
      badAudio: null,
      players: []
    };
  },

  mounted() {
    this.goodAudio = this.$el.querySelector('#good-sound-file');
    this.badAudio = this.$el.querySelector('#bad-sound-file');
    Player.findAll().then((players) => {
      this.players = players;
    });
  },

  methods: {
    _findPlayerById(id) {
      return this.players.find((player) => {
        return player.id == id;
      });
    },

    _playAudio(audio1, audio2) {
      if (audio1.currentTime != null) {
        audio1.pause();
        audio1.currentTime = 0;
      }
      if (audio2.currentTime != null) {
        audio2.pause();
        audio2.currentTime = 0;
      }
      audio1.play();
    }
  },

  sockets: {
    'player/update'(json) {
        const player = this._findPlayerById(json.id);
        if (player.badCount < json.badCount) {
          this._playAudio(this.badAudio, this.goodAudio);
        }
        if (player.goodCount < json.goodCount) {
          this._playAudio(this.goodAudio, this.badAudio);
        }
        player.goodCount = json.goodCount;
        player.badCount = json.badCount;
    }
  }
}
</script>

<style lang="scss">

.application > .application--wrap > .v-content > .v-content__wrap > .container {
  height: 100%;
}

.hidden {
  display: none;
}

</style>
