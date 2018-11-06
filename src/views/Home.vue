<template>
  <div class="home">
    <qriously class="qr-code" value="Hello World!" :size="200" />
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      :click="onAddBtn"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    // components: {
    //   HelloWorld
    // },

    methods: {
      onAddBtn() {
      }
    }
  }
</script>
