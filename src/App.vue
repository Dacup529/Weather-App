<template>
  <div :class="backgroundClass" class="app-container">
    <nav class="nav" aria-label="Main navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/hourly">Hourly</router-link>
      <router-link to="/5day">5 Day</router-link>
    </nav>
    <router-view @update-bg="updateBackground"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundClass: "bg-clear",
    };
  },
  methods: {
    updateBackground({ condition, tempF, localTime }) {
      const hour = new Date(localTime).getHours();
      const cond = condition.toLowerCase();
      let bgClass = "bg-clear";
      if (cond.includes("rain")) bgClass = "bg-rain";
      else if (cond.includes("snow")) bgClass = "bg-snow";
      else if (hour >= 18 || hour < 6) bgClass = "bg-night";
      else if (tempF > 75) bgClass = "bg-warm";
      this.backgroundClass = bgClass;
    },
  },
};
</script>
<style scoped>
.app-container {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}
.bg-clear {
  background-image: url(./assets/bg-clear.jpg);
}
.bg-rain {
  background-image: url(./assets/bg-rain.jpg);
}
.bg-snow {
  background-image: url(./assets/bg-snow.jpg);
}
.bg-night {
  background-image: url(./assets/bg-night.jpg);
}
.bg-warm {
  background-image: url(./assets/bg-warm.jpg);
}
.nav a {
  margin-right: 20px;
  font-weight: bold;
}
</style>
