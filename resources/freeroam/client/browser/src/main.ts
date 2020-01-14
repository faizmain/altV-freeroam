import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

alt.on('browser::commit', (event: string, data: any) => app.$store.commit(event, data));
app.$mount('#app');
