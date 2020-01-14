import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Kill {
  killer: string;
  victim: string;
  weapon: number;
}

export default new Vuex.Store({
  state: {
    scoreBoard: [],
    kills: [] as Kill[],
    onlineCount: 0
  },
  mutations: {
    addKillToList(state, kill) {
      state.kills.push(kill);
      setTimeout(() => state.kills.shift(), 2000);
    },
    
    setScoreBoard(state, scoreBoard) {
      state.scoreBoard = scoreBoard;
    },
    
    updateOnline(state, online) {
      state.onlineCount = online;
    }
  }
});
