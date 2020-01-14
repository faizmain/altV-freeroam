<template>
  <div class="layer kill-list-layer">
    <transition-group name="fade">
      <div class="kill-list" v-for="kill in kills" :key="kill">
        <div class="kill-list-item">
          <div class="kill-list-killer">{{ kill.killer }}</div>
          <div class="kill-list-weapon">({{ kill.weapon }})</div>
          <div class="kill-list-victim">{{ kill.victim }}</div>
        </div>
      </div>
    </transition-group>
    <div class="layer players-online-layer">
      <div class="players-online">{{ onlineCount }} players</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class Content extends Vue {
    get kills() {
      return this.$store.state.kills;
    }

    get onlineCount() {
      return this.$store.state.onlineCount;
    }
  }
</script>

<style lang="scss" scoped>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    user-select: none;
  }

  .kill-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-item {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      margin-top: 10px;
      font-size: 18px;
      transition: all 0.2s ease;
      max-height: 50px;
      overflow-y: hidden;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-shadow: 0 0 15px rgba(0,0,0,.5);
    }

    &-layer {
      justify-content: flex-end;
    }

    &-item-delete {
      max-height: 0px;
    }

    &-killer {
      margin-right: 10px;
      font-weight: bold;
    }

    &-victim {
      margin-left: 10px;
      font-weight: bold;
    }
  }

  .players-online {
    margin: 0 20px 120px 0;
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 10px;
    background: rgba(0,0,0,0.5);
    padding: 16px;
    color: white;
    font-weight: 600;

    &-layer {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

</style>
