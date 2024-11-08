import { Weather } from "../models/interface";

function createHtml(weatherData: Weather[]) {
  const content = document.querySelector(".content") as HTMLDivElement;
  const upper = document.querySelector(".upper") as HTMLDivElement;
  const lower = document.querySelector(".lower") as HTMLDivElement;
  const cityInfo = document.createElement("div");
  const tempInfo = document.createElement("div");
  const weatherFacts = document.createElement("div");
  const forecastContainer = document.createElement("div");
  const dailyData = new Map<string, any[]>();
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  upper.innerHTML = "";
  lower.innerHTML = "";

  const city = document.createElement("p") as HTMLParagraphElement;
  const weekdayElement = document.createElement("p") as HTMLParagraphElement;
  const fullDateElement = document.createElement("p") as HTMLParagraphElement;
  const weatherMain = document.createElement("p") as HTMLParagraphElement;
  const temp = document.createElement("p") as HTMLParagraphElement;

  const windWeatherFacts = document.createElement("div");
  const humidityWeatherFacts = document.createElement("div");
  const pressureWeatherFacts = document.createElement("div");
  const wind = document.createElement("p") as HTMLParagraphElement;
  const humidity = document.createElement("p") as HTMLParagraphElement;
  const pressure = document.createElement("p") as HTMLParagraphElement;
  const windPara = document.createElement("p") as HTMLParagraphElement;
  const humidityPara = document.createElement("p") as HTMLParagraphElement;
  const pressurePara = document.createElement("p") as HTMLParagraphElement;
  const windImg = document.createElement("img") as HTMLImageElement;
  const humidityImg = document.createElement("img") as HTMLImageElement;
  const pressureImg = document.createElement("img") as HTMLImageElement;

  const date = new Date(weatherData[0].list[0].dt_txt);

  // Hämta veckodagen som en fullständig sträng (t.ex. "Thursday")
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });

  // Hämta datumet i formatet "04 November"
  const fullDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
  });

  city.innerText = weatherData[0].city.name;
  city.classList.add("city");
  weekdayElement.innerText = weekday;
  weekdayElement.classList.add("weekday");
  fullDateElement.innerText = fullDate;

  weatherMain.innerText = weatherData[0].list[0].weather[0].main;
  temp.innerHTML =
    Math.ceil(weatherData[0].list[0].main.temp).toString() + "&#176;";
  temp.classList.add("temp");

  //HA kvar
  wind.innerHTML = `${weatherData[0].list[0].wind.speed}m/s`;
  humidity.innerHTML = `${weatherData[0].list[0].main.humidity}%`;
  pressure.innerHTML = `${weatherData[0].list[0].main.pressure}hpa`;
  windPara.innerHTML = "Wind";
  humidityPara.innerHTML = "Humidity";
  pressurePara.innerHTML = "Pressure";
  windImg.src = "https://cdn-icons-png.flaticon.com/128/9623/9623926.png";
  humidityImg.src = "https://cdn-icons-png.flaticon.com/128/5587/5587247.png";
  pressureImg.src = "https://cdn-icons-png.flaticon.com/128/10440/10440772.png";

  windWeatherFacts.appendChild(windImg);
  windWeatherFacts.appendChild(wind);
  windWeatherFacts.appendChild(windPara);
  windWeatherFacts.classList.add("WeatherFactsCard");
  humidityWeatherFacts.appendChild(humidityImg);
  humidityWeatherFacts.appendChild(humidity);
  humidityWeatherFacts.appendChild(humidityPara);
  pressureWeatherFacts.appendChild(pressureImg);
  pressureWeatherFacts.appendChild(pressure);
  pressureWeatherFacts.appendChild(pressurePara);
  weatherFacts.appendChild(windWeatherFacts);
  weatherFacts.appendChild(humidityWeatherFacts);
  weatherFacts.appendChild(pressureWeatherFacts);

  humidityWeatherFacts.classList.add("WeatherFactsCard");
  pressureWeatherFacts.classList.add("WeatherFactsCard");
  weatherFacts.classList.add("weatherFacts");

  cityInfo.classList.add("cityInfo");
  cityInfo.appendChild(city);
  cityInfo.appendChild(weekdayElement);
  cityInfo.appendChild(fullDateElement);

  tempInfo.classList.add("tempInfo");
  tempInfo.appendChild(temp);
  tempInfo.appendChild(weatherMain);

  upper.appendChild(cityInfo);
  upper.appendChild(tempInfo);
  lower.appendChild(weatherFacts);

  weatherData[0].list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];

    if (date > todayDate) {
      if (!dailyData.has(date)) {
        dailyData.set(date, []);
      }
      dailyData.get(date)?.push(entry);
    }
  });

  dailyData.forEach((entries, date) => {
    const middayEntry =
      entries.find((entry) => entry.dt_txt.includes("12:00:00")) || entries[0];
    handleIcon(middayEntry);

    const dayCard = document.createElement("div");
    const forecastDate = document.createElement("p");
    const forecastTemp = document.createElement("p");
    const forecastIcon = document.createElement("img");

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-GB", { month: "short" });

    forecastTemp.innerText = Math.ceil(middayEntry.main.temp) + "ºC";
    forecastDate.innerText = `${day} ${month}`;

    dayCard.classList.add("dayCard");
    dayCard.appendChild(forecastDate);
    dayCard.appendChild(forecastIcon);
    dayCard.appendChild(forecastTemp);
    forecastContainer.classList.add("forecastContainer");
    forecastContainer.appendChild(dayCard);
    lower.appendChild(forecastContainer);
  });

  content.appendChild(upper);
  content.appendChild(lower);
}

// Uppdatera signaturen för handleIcon
function handleIcon(middayEntry: Weather) {}

export { createHtml };
