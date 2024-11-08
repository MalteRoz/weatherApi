import { fetchGeoData } from "../services/weatherService";

function searchListner() {
  const search = document.querySelector(".search") as HTMLButtonElement;
  search.addEventListener("click", () => {
    fetchGeoData();
  });
}

export { searchListner };
