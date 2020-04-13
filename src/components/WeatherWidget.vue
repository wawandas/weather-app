<template>
  <div>
    <v-snackbar v-model="error">
      Ooops... some error happened, make sure city name is correct.
      <v-btn color="pink" text @click="dismiss">
        Close
      </v-btn>
    </v-snackbar>
    <v-card
      class="mx-auto"
      max-width="400"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <v-form class="pa-4">
        <v-row>
          <v-col cols="10">
            <v-text-field
              name="city"
              placeholder="Enter city"
              solo
              clearable
              hide-details
              v-model="city"
              @keydown.enter.prevent="getWeatherForCity"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2" class="align-center">
            <v-btn icon @click.prevent="getWeatherForCoords">
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <div v-if="data.cod === 200">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline" data-label="weather-city-name"
              >{{ data.name }}, {{ data.sys.country }}</v-list-item-title
            >
            <v-list-item-subtitle>
              {{ data.dt | formatedDate }}, {{ data.weather[0].main }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col cols="6">
              <span class="display-3">{{ data.main.temp | celsius }}</span>
            </v-col>
            <v-col cols="6" class="justify-center">
              <img :src="getImage()" />
              <br />
              ({{ data.weather[0].description }})
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ data.wind.speed }} m/c</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-eye-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ data.visibility }} m</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-water</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ data.main.humidity }}%</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    city: "",
    latitude: "",
    longitude: ""
  }),

  beforeMount() {
    this.getLocation();
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },

    data() {
      return this.$store.state.data;
    },

    error: {
      get() {
        return this.$store.state.error;
      },
      set() {}
    }
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setCoords);
      } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },

    setCoords(position) {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
    },

    getWeatherForCity() {
      const query = `?q=${this.city}`;
      this.fetchData(query);
    },

    dismiss() {
      this.$store.state.error = false;
    },

    getWeatherForCoords() {
      this.getLocation();
      const query = `?lat=${this.latitude}&lon=${this.longitude}`;
      this.fetchData(query);
    },

    fetchData(query) {
      this.$store.dispatch("fetchData", query);
      this.city = "";
    },

    getImage() {
      return require(`../assets/weatherIcons/${this.data.weather[0].icon}.png`);
    }
  }
};
</script>
