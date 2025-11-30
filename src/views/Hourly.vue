<template>
  <div>
    <h2>Hourly Forecast</h2>
    <SearchBar @search="fetchHourly"/>
    <p v-if="location" class="location-name">
      Hourly forecast for {{ location }}
    </p>
    <Line v-if="chartData" :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

import SearchBar from "../components/SearchBar.vue";
import { getHourly } from "../services/Weather";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default {
  components: { Line, SearchBar },
  data() {
    return {
      chartData: null,
      location: "",
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            title: { display: true, text: "Temp (°F)" },
          },
          y1: {
            type: "linear",
            position: "right",
            title: { display: true, text: "Rain (in)" },
            grid: { drawOnChartArea: false },
          },
        },
      },
    };
  },

  methods: {
    async fetchHourly(loc) {
      const { data } = await getHourly(loc);
      const hours = data.forecast.forecastday[0].hour;
      this.location = data.location.name;
      this.chartData = {
        labels: hours.map((h) => h.time.split(" ")[1]),
        datasets: [
          {
            label: "Temp (°F)",
            data: hours.map((h) => h.temp_f),
            borderColor: "blue",
            yAxisID: "y",
            tension: 0.3,
          },
          {
            label: "Rain (in)",
            data: hours.map((h) => h.precip_in),
            borderColor: "green",
            yAxisID: "y1",
            tension: 0.3,
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
.location-name {
  font-weight: bold;
  margin: 10px 0;
}
</style>