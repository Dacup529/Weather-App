<template>
    <div class="card">
    <section class="card" aria-label="Current weather information">
        <h2>{{ weather.location.name }}</h2>
        <h2>{{ weather.location.region }}</h2>
        <h2>{{ weather.location.country }}</h2>
        <p>{{ weather.current.condition.text }}</p>
        <p>Temp: {{ weather.current.temp_f }}°F</p>
        <p>High: {{ weather.forecast.forecastday[0].day.maxtemp_f }}°F</p>
        <p>Low: {{ weather.forecast.forecastday[0].day.mintemp_f }}°F</p>
    </section>
    </div>
</template>

<script>
    export default {
        props: ["weather"],
    };
</script>