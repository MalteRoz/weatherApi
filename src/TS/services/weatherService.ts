import axios from "axios";
import { GeoResponse, Weather } from "../models/interface";
import { createHtml } from "../functions/functions";

const searchField = document.querySelector(".searchField") as HTMLInputElement;
const apiKey = "2b29ffda10eac86ad89991e5ce7c66a5";

let geoData: GeoResponse[] = [];
let weatherData: Weather[] = [];

async function fetchGeoData() {
  try {
    const searchValue = searchField.value.toString();
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${apiKey}`
    );

    if (response && response.data && response.data.length > 0) {
      geoData = response.data;
      console.log("Data:", geoData);

      fetchWeatherData(geoData[0]);
    } else {
      throw new Error("Ogiltigt svar från API: Inget data.");
    }
  } catch (error) {
    console.error(error);
  }
}

// Ändra parametern till en enskild `GeoResponse` istället för en array
async function fetchWeatherData(location: GeoResponse) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`
    );

    if (response.data && response.data.city) {
      // console.log(response.data.city.country);
    } else {
      console.error("City data not found in the response");
    }

    weatherData = [
      {
        city: response.data.city,
        list: response.data.list,
      },
    ];

    createHtml(weatherData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

export { fetchGeoData, weatherData };
