<template>
  <div class="saved-container">
    <h3>Saved Locations</h3>
    <ul class="saved-list">
      <li v-for="loc in locations" :key="loc.location" class="saved-item">
        <span class="location-display">{{ loc.name }} ({{ loc.location }})</span>
        <div class="button-group">
          <button 
            @click="$emit('select', loc.location)" 
            class="location-button" 
            aria-label="Load weather for {{ loc.location }}">
            Load
          </button>
          <button 
            @click="$emit('delete', loc.location)" 
            class="delete-button"
            aria-label="Remove saved location {{ loc.name }}">
            X
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["locations"],
};
</script>

<style scoped>
.saved-container {
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
}

.saved-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.saved-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 140px;
  flex: 1 1 140px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.saved-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

.location-display {
  font-weight: bold;
  margin-bottom: 8px;
  word-break: break-word;
}

.button-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.location-button, .delete-button {
  padding: 4px 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.location-button {
  background-color: #1976d2;
  color: white;
}

.location-button:hover {
  background-color: #1565c0;
}

.delete-button {
  background-color: #e53935;
  color: white;
}

.delete-button:hover {
  background-color: #c62828;
}
</style>

