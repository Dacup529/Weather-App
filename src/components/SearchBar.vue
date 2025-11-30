<template>
    <form @submit.prevent="submit">
    <label for="search" class="sr-only">Search for a city</label>
    <input 
    id="search"
    v-model="location"
    placeholder="Search location"
    aria-label="Search for a city or location"
    autocomplete="off"
    /> 
    <button type="submit" aria-label="Search for weather">Search</button>
</form>
</template>

<script>
    export default{
        data(){
            return{location: ""};
        },
        methods: {
            submit(){
                if (this.location.trim() !== "") {
                    this.$emit("search", this.location);
                }
            },
        },
    };
</script>
