<template>
  <v-card class="mx-auto" max-width="400" :loading="isLoading">
    <v-form class="pa-4">
      <v-row>
        <v-col cols="10">
          <v-text-field
            placeholder="Enter city"
            solo
            clearable
            hide-details
            v-model="city"
            @keydown.enter.prevent="getData('city')"
          >
          </v-text-field>
        </v-col>
        <v-col cols="2" class="align-center">
          <v-btn icon @click.prevent="getData">
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div v-if="data.cod === 200">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            data.name
          }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ data.dt | formatedDate }}, {{ data.weather[0].main }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col cols="6">
            <span class="display-3">{{ data.main.temp | celsius }}</span>
            <br />
            ({{ data.weather[0].description }})
          </v-col>
          <v-col cols="6" class="justify-center">
            <v-img :src="getImage()" width="92"></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ data.wind.speed }} m/c</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ data.main.humidity }}%</v-list-item-subtitle>
      </v-list-item>

      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object
  },

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
      return this.$store.isLoading;
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

    getData(typeQuery) {
      let query = "";

      if (typeQuery === "city") {
        query = `?q=${this.city}`;
      } else {
        query = `?lat=${this.latitude}&lon=${this.longitude}`;
      }

      this.$store.dispatch("fetchData", query);
      this.city = "";
    },

    getImage() {
      return require(`../assets/weatherIcons/${this.data.weather[0].icon}.png`);
    }
  }
};
</script>
