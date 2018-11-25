<template>
  <div class="home">
    <qriously class="qr-code" value="Hello World!" :size="200" />
    <v-list subheader>
      <v-subheader>参加者一覧</v-subheader>
      <template v-for="(player, index) in players">
        <v-divider :key="index"></v-divider>
        <v-list-tile :key="player.id">

          <v-list-tile-content>
            <v-list-tile-title v-html="player.name"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn outline fab small color="red" @click="clickRemoveBtn(player.id)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-btn fixed dark fab bottom right color="pink" @click="clickAddBtn">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="openDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">参加者登録</v-card-title>

        <v-text-field class="entry-name" label="名前" v-model="entryName"></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="openDialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="clickSaveBtn">登録</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Player from '@/models/Player';

  export default {
    data() {
      return {
        players: [],
        openDialog: false,
        entryName: null,
      };
    },

    mounted() {
      this._findPlayers();
    },

    methods: {
      clickAddBtn() {
        this.openDialog = true;
      },

      clickSaveBtn() {
        const player = Player.of(this.entryName);
        player.save();
        this.openDialog = false;
      },

      closeDialog() {
        this.entryName = null;
        this._findPlayers();
      },

      _findPlayers() {
        Player.findAll().then((players) => {
          this.players = players;
        });
      },

      clickRemoveBtn(id) {
        Player.remove(id);
        this._findPlayers();
      }
    },

    watch: {
      openDialog(val) {
        val || this.closeDialog();
      },
    },
  }
</script>

<style lang="scss" scoped>
.qr-code {
  text-align: center;
}

.entry-name {
  margin-left: 20px;
  margin-right: 20px;
}

.v-list {
  padding-bottom: 0;
  max-width: 400px;
  margin-right: auto;
  margin-left: auto;
}
</style>
