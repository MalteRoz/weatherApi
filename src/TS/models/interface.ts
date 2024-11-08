export interface GeoResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface Weather {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number; // Timestamp of forecast
    main: {
      temp: number; // Temperature
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    dt_txt: string; // Forecast timestamp string
  }[];
}
