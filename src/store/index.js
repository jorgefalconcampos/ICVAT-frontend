import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import uiux from './modules/uiux';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    auth,
    uiux
  },
  plugins: [createPersistedState()]
});
