import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "weather-app",
  storage: window.localStorage,
  reducer: state => {
    return { data: state.data };
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    apiKey: "ef6fded646b25aeb80ae34d522bb493d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    isLoading: false,
    error: null
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },

    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    fetchData({ commit, state }, params) {
      state.isLoading = true;

      axios
        .get(`${state.baseUrl}${params}&appid=${state.apiKey}&units=metric`)
        .then(({ data }) => {
          commit("setData", data);
          commit("setError", null);
        })
        .catch(e => {
          commit("setError", e);
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
  },
  plugins: [vuexPersist.plugin]
});
