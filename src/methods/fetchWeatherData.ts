import { getAPIKey } from './apiKey';

// Ik schrijf zelf altijd een type definition voor arguments,
// zodat ik weet welke data er in gaat, en welke data er uit gaat.
//
// Daarnaast destructure ik de arguments van de functie, zodat je later altijd arguments kan toevoegen,
// in een andere volgorde mee kan geven, en op een eenvoudigere manier data kan 'doorgeven'.
// Voor deze functie wellicht wat overdreven.

export interface fetchWeatherDataType {
    city: string;
}

export const fetchWeatherData = async ({city}: fetchWeatherDataType) => {
    const apiKey = getAPIKey();
    const apiEndpoint = new URL('https://api.openweathermap.org/data/2.5/forecast');
    apiEndpoint.searchParams.append('q', city);
    apiEndpoint.searchParams.append('APPID', apiKey);
    const response = await fetch(apiEndpoint.href);
    if (response.status !== 200) {
        throw new Error(`Error fetching weather data for ${city}: ${response.status}`);
    };
    const data = await response.json();
    return data;
}

export default fetchWeatherData;