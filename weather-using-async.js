const fs = require('fs').promises;
const axios = require('axios');
const { apiKey, city, weatherUrl, forecastUrl } = require('./c');

async function fetchWeather() {
  try {
    const response = await axios.get(`${weatherUrl}?q=${city}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather: ${error.message}`);
  }
}

async function fetchForecast() {
  try {
    const response = await axios.get(`${forecastUrl}?q=${city}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching forecast: ${error.message}`);
  }
}

async function saveDataToFile(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data saved successfully to', filename);
  } catch (error) {
    throw new Error(`Error saving data: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('Fetching weather data...');
    const weatherData = await fetchWeather();

    console.log('Fetching forecast data...');
    const forecastData = await fetchForecast();

    const combinedData = {
      city,
      weather: weatherData,
      forecast: forecastData
    };

    console.log('Saving data to file...');
    await saveDataToFile('weatherData.json', combinedData);
  } catch (error) {
    console.error(error.message);
  }
}

main();
