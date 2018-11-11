<template>
  <div class="home">
    <qriously class="qr-code" value="Hello World!" :size="200" />
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
  // import HelloWorld from '../components/HelloWorld'
  import Player from '@/models/Player';

  export default {
    // components: {
    //   HelloWorld
    // },
    data() {
      return {
        openDialog: false,
        entryName: null,
      };
    },

    computed: {
      isSelected() {
        return !!this.file;
      }
    },

    methods: {
      clickAddBtn() {
        this.openDialog = true;
      },

      clickSaveBtn() {
        const player = Player.new(this.entryName);
        player.save();
        this.openDialog = false;
      }
    }
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
</style>
