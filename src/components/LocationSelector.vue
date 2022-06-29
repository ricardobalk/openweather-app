<template>
    <div class="location-selector">
        <select v-model="selectedLocation">
            <option v-for="(location, index) in locations" :value="location" :key="index">{{location}}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
    import { inject } from "vue";
    defineProps({
    locations: Array<string>,
    });
    const selectedLocation = inject('selectedLocation');
</script>

<script lang="ts">
// // Langere versie:
// import { defineComponent, inject } from "vue";

// const LocationSelector = defineComponent({
//     name: 'LocationSelector',
//     props: {
//         locations: {
//             type: Array,
//             required: true
//         }
//     },
//     setup(props, context) {
//         const selectedLocation = inject('selectedLocation');
//         return {selectedLocation};
//     }
// });

// export default LocationSelector;
</script>