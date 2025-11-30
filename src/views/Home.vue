<template>
  <p class="sr-only" aria-live="polite">
    {{ weather ? "Weather loaded for " + weather.location.name: "" }}
  </p>
  <div>
    <SearchBar @search="searchWeather" />
  <div v-if="errorMessage" class="error-message" role="alert"> 
  {{ errorMessage }} 
  </div> 
  <WeatherCard v-if="weather" :weather="weather" /> 
  <SavedLocations :locations="savedLocations" @select="searchWeather" @delete="deleteLocation" />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import WeatherCard from "../components/WeatherCard.vue";
import SavedLocations from "../components/SavedLocations.vue";
import { getWeather } from "../services/Weather.js";

export default {
  components: { SearchBar, WeatherCard, SavedLocations },

  data() {
    return {
      weather: null,
      savedLocations: JSON.parse(localStorage.getItem("savedLocations")) || [],
      errorMessage: "",
    };
  },
  methods: {
    async searchWeather(location) {
      try{
        const response = await getWeather(location);
        this.weather = response.data;
        this.$emit("update-bg", {
          condition: this.weather.current.condition.text,
          tempF: this.weather.current.temp_f,
          localTime: this.weather.location.localtime
        });
        this.saveLocation(location);
        this.errorMessage= "";
      }catch (err) {
        this.errorMessage="Location not found or API error.";
      }  
    },
    saveLocation(location) {
      if (!this.savedLocations.includes(location)) {
        this.savedLocations.push(location);
        localStorage.setItem(
          "savedLocations",
          JSON.stringify(this.savedLocations)
        );
      }
    },
    deleteLocation(location) {
      this.savedLocations = this.savedLocations.filter((l) => l !== location);
      localStorage.setItem(
        "savedLocations",
        JSON.stringify(this.savedLocations)
      );
    },
  },
};
</script>
