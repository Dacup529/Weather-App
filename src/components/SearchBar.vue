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
<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto 2rem auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

@media (min-width: 600px) {
  .search-form {
    flex-direction: row;
  }
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.search-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.search-btn:hover {
  background-color: #1976d2;
}

.search-input:focus,
.search-btn:focus {
  outline: 3px solid #444;
  outline-offset: 2px;
}
</style>
