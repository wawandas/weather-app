import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mount, createLocalVue } from "@vue/test-utils";
import WeatherWidget from "@/components/WeatherWidget.vue";
import store from "@/store";

Vue.filter("celsius", value => {
  return `${Math.round(value)}\xB0C`;
});

Vue.filter("formatedDate", timestamp => {
  const d = new Date(timestamp * 1000);
  const weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
  const day = weekday[d.getDay()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  return `${date} ${day}, ${hour}:${min}`;
});

Vue.use(Vuetify);

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

describe("WeatherWidget.vue", () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();

    localVue.use(Vuetify);
    localVue.use(Vuex);

    wrapper = mount(WeatherWidget, {
      store,
      localVue
    });
  });

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("fetches weather data of entered city on enter event", async () => {
    const mock = new MockAdapter(axios);

    mock.onGet(/\/weather/).reply(200, {
      ...data,
      sys: {
        ...data.sys,
        country: "DE"
      },
      name: "Berlin"
    });

    wrapper.find('input[name="city"]').setValue("Berlin");
    wrapper.find('input[name="city"]').trigger("keydown.enter");

    //this part has to be improved :'((
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('div[data-label="weather-city-name"]').text()).toBe(
      "Berlin, DE"
    );
  });
});
