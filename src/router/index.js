import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Hourly from "../views/Hourly.vue";
import FiveDay from "../views/FiveDay.vue";

const routes = [
    {path: "/", component: Home},
    {path: "/hourly", component: Hourly},
    {path: "/5day", component: FiveDay}
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
