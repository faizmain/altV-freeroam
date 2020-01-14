<template>
  <Content/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Content from '@/components/Content.vue';

  @Component({
    components: {
      Content
    }
  })
  export default class Home extends Vue {}
</script>