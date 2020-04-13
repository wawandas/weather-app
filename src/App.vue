<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>

    <v-content class="align-center indigo lighten-5">
      <WeatherWidget />
    </v-content>
  </v-app>
</template>

<script>
import WeatherWidget from "./components/WeatherWidget";

export default {
  name: "App",

  components: {
    WeatherWidget
  }
};
</script>
