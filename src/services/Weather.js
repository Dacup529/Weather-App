import axios from "axios";
const API_KEY = "56d3860357734370957175753253011";
export async function getWeather(location) {
  return axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5`
  );
}
export async function getHourly(location) {
  return axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no`
  );
}