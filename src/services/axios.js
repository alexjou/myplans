import axios from "axios";

//Busca na api do openweathermap os dados meteorólogicos, de acordo com as coordenadas enviadas
export const getPlans = async (coordinate) => {
  let res = axios.get(
    "https://octupus-challenge.vercel.app/api/options?" +
      "lat=" +
      coordinate.lat +
      "&lon=" +
      coordinate.lon
  );
  return res;
};
