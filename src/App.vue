<template>
  <div :style="{ backgroundImage: `url(${currentBg})` }" class="app-container">
    <nav class="nav" aria-label="Main navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/hourly">Hourly</router-link>
      <router-link to="/5day">5 Day</router-link>
    </nav>

    <router-view @update-bg="updateBackground"></router-view>
  </div>
</template>

<script>
import bgClear from '@/assets/bg-clear.jpg'
import bgRain from '@/assets/bg-rain.jpg'
import bgSnow from '@/assets/bg-snow.jpg'
import bgNight from '@/assets/bg-night.jpg'
import bgWarm from '@/assets/bg-warm.jpg'

export default {
  data() {
    return {
      currentBg: bgClear,
      backgroundMap: {
        clear: bgClear,
        rain: bgRain,
        snow: bgSnow,
        night: bgNight,
        warm: bgWarm,
      }
    }
  },

  methods: {
    updateBackground({ condition, tempF, localTime }) {
      const hour = new Date(localTime).getHours()
      const cond = condition.toLowerCase()

      if (cond.includes("rain")) this.currentBg = this.backgroundMap.rain
      else if (cond.includes("snow")) this.currentBg = this.backgroundMap.snow
      else if (hour >= 18 || hour < 6) this.currentBg = this.backgroundMap.night
      else if (tempF > 75) this.currentBg = this.backgroundMap.warm
      else this.currentBg = this.backgroundMap.clear
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
}

.nav a {
  margin-right: 20px;
  font-weight: bold;
}
</style>

