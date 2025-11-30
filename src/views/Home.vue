<template>
  <div class="home-container">
    <p class="sr-only" aria-live="polite">
      {{ weather ? "Weather loaded for " + weather.location.name : "" }}
    </p>

    <div class="search-wrapper">
      <SearchBar @search="searchWeather" />
    </div>

    <div v-if="errorMessage" class="error-message" role="alert"> 
      {{ errorMessage }} 
    </div> 

    <div v-if="weather" class="weather-wrapper">
      <WeatherCard :weather="weather" /> 

      <div class="save-location">
        <input 
          v-model="locationName" 
          placeholder="Enter a name for this location"
        />
        <button @click="saveLocation(weather.location.name, locationName)">
          Save Location
        </button>
      </div>
    </div>

    <SavedLocations 
      :locations="savedLocations" 
      @select="searchWeather" 
      @delete="deleteLocation" 
    />
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
      locationName: "",
      errorMessage: "",
    };
  },

  methods: {
    async searchWeather(location) {
      try {
        const response = await getWeather(location);
        this.weather = response.data;
        this.$emit("update-bg", {
          condition: this.weather.current.condition.text,
          tempF: this.weather.current.temp_f,
          localTime: this.weather.location.localtime,
        });
        this.errorMessage = "";
      } catch (err) {
        this.errorMessage = "Location not found or API error.";
      }  
    },

    saveLocation(location, name) {
      if (!this.savedLocations.find(l => l.location === location)) {
        this.savedLocations.push({ location, name });
        localStorage.setItem(
          "savedLocations",
          JSON.stringify(this.savedLocations)
        );
      }
    },

    deleteLocation(location) {
      this.savedLocations = this.savedLocations.filter(l => l.location !== location);
      localStorage.setItem(
        "savedLocations",
        JSON.stringify(this.savedLocations)
      );
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40px 20px;
}

.search-wrapper {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.weather-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.save-location {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.save-location input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.save-location button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.save-location button:hover {
  background-color: #1565c0;
}

.error-message {
  color: #e53935;
  margin-bottom: 12px;
  font-weight: bold;
  text-align: center;
  max-width: 400px;
}
</style>


