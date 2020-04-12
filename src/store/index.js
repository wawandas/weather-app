import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const data = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 300,
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09d"
    }
  ],
  base: "stations",
  main: {
    temp: 28,
    pressure: 1012,
    humidity: 81,
    temp_min: 27,
    temp_max: 28
  },
  visibility: 10000,
  wind: { speed: 4.1, deg: 80 },
  clouds: { all: 90 },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: "GB",
    sunrise: 1485762037,
    sunset: 1485794875
  },
  id: 2643743,
  name: "London",
  cod: 200
};

export default new Vuex.Store({
  state: {
    data: data,
    apiKey: "ef6fded646b25aeb80ae34d522bb493d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    isLoading: false
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    }
  },
  actions: {
    fetchData({ commit, state }, params) {
      state.isLoading = true;

      axios
        .get(`${state.baseUrl}${params}&appid=${state.apiKey}&units=metric`)
        .then(({ data }) => {
          commit("setData", data);
        })
        .finally(() => {
          state.isLoading = false;
        });
    }
  }
});
