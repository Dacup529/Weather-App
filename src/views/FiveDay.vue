<template>
    <div>
        <h2>5 Day Forecast</h2>
        <SearchBar @search="fetchWeather"/>
        <p v-if="location" class="location-name">
            5-day forecast for {{ location }}
        </p>
        <table v-if="forecast.length">
            <caption class="sr-only">Five day weather forecast</caption>
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Conditions</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in forecast.slice(0,5)" :key="day.date">
                    <td>{{ day.date }}</td>
                    <td>{{ day.day.condition.text }}</td>
                    <td>{{ day.day.maxtemp_f }}°F</td>
                    <td>{{ day.day.mintemp_f }}°F</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import { getWeather } from "../services/Weather";

export default {
    components: { SearchBar },
    data() {
        return {
            forecast: [],
            location: "",
        };
    },
    methods: {
        async fetchWeather(loc) {
            const { data } = await getWeather(loc);
            this.location = data.location.name;
            this.forecast = data.forecast.forecastday;
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