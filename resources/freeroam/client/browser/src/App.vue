<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private beforeMount() {
      alt.emit('browser::loaded');
    }
  }
  </script>

  <style lang="scss">
  body, html {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #FFF;
    width: 100%;
    height: 100%;
  }
</style>
