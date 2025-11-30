<template>
    <div>
        <h3>Saved Locations</h3>
        <ul>
            <li v-for="loc in locations" :key="loc">
                <button @click="$emit('select',loc)" class="location-button" aria-label="Load weather for {{ loc }}"></button>
                <button @click="$emit('delete', loc)" aria-label="Remove saved location {{ loc }}">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ["locations"],
    };
</script>
