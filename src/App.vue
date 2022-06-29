<script setup lang="ts">
  import { provide, ref, reactive, watch } from 'vue';
  import LocationSelector from './components/LocationSelector.vue';
  import AvailableLocations from './data/locations';
  import { fetchWeatherData, fetchWeatherDataType } from './methods/fetchWeatherData';
  import TemperatureForecast from './components/Charts/TemperatureForecast.vue';
  import { filterGraphData } from './methods/filterGraphData';

  // console.log('API key: ' + getAPIKey());

  const availableLocations = AvailableLocations; // voor nu static data, later dynamisch ophalen via API.

  // We gebruiken Inject/Provide als global state store voor de applicatie.
  // Inject/Provide API is een 'nieuwe' feature in Vue 3, vergelijkbaar met Vuex - maar dan scoped
  // combineer met ref() of reactive() om de value ook vanuit children aanpasbaar te maken
  // want normaal gesproken (zonder ref/reactive) is het one-way.

  const selectedLocation = ref(availableLocations[0]); // Let erop dat [0] niet werkt met dynamische data, omdat het dan async is en de array dan nog niet bestaat.
  provide('selectedLocation', selectedLocation); // Provider voor de geselecteerde locatie tbv child components.

  const filteredLineGraphData = reactive({
    xAxis: [1,2,3],
    yAxis: [2,3,4],
  }); // Reactive array voor de gefilterde data.

  // Watch 'selectedLocation':
  // - als de geselecteerde locatie verandert, haal de data op van de OpenWeather API.
  // - hiervoor gebruiken we een method die in methods/fetchWeatherData.ts staat.

  watch(selectedLocation, (city) => {
    console.log(`Location changed to: ${city}.`);
    updateWeatherData({city});
  });

  // Weatherdata
  const weatherData = reactive({
    isLoading: true,
    error: null,
    data: {}
  }); // Let erop dat we geen initial value geven, omdat we deze nog niet hebben.
  // provide('weatherData', weatherData); // Provider voor de weerdata tbv child components.

  const updateWeatherData = async ({city} : fetchWeatherDataType) => {
    weatherData.isLoading = true;
    const data = await fetchWeatherData({ city });
    weatherData.data = data;
    weatherData.isLoading = false;
    console.log('Weather data updated.', weatherData.data);

    // Weerdata is nu gevuld, dus we kunnen de data verwerken en de grafiek updaten.
    const filteredData = filterGraphData(data);
    updateGraph(filteredData);
  };

  const updateGraph = (data: Record<string, any>[]) => {
    const xAxis = data.map(item => item.time);
    const yAxis = data.map(item => item.temperature);
    filteredLineGraphData.xAxis = xAxis;
    filteredLineGraphData.yAxis = yAxis;
    console.log('Graph data updated.', xAxis, yAxis);
  };

  // Initialise app, fetch data
  updateWeatherData({city: selectedLocation.value});
</script>

<template>
  <div id="app">

    <div class="selectedLocation">
          <h1>Selecteer een locatie:</h1>
          <LocationSelector :locations="availableLocations" />
    </div>

    <div class="selection-city">
      <h2>Uw selectie:</h2>
      <p>
        U heeft geselecteerd: {{ selectedLocation }}
      </p>
    </div>

    <div class="graph" v-if="Object.keys(weatherData.data).length !== 0">
      <h2>Grafiek:</h2>
      <TemperatureForecast :xAxis="filteredLineGraphData.xAxis" :yAxis="filteredLineGraphData.yAxis" />
    </div>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
