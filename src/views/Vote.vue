<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Player from '@/models/Player';

export default {
  mounted() {
    Player.findAll().then((players) => {
      console.log(players);
    });
  }
}
</script>
