import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    isEditOut: true
  }, //新加的
  mutations : {
    changeisEditOut: (state, flag) => {
      state.isEditOut = flag
      console.log(flag)
    },
  },

})

export default store
