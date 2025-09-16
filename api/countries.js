import axios from "axios";


const base = import.meta.env.VITE_API_BASE || "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  const fields = "name,cca3,flags,population,region,capital";
  const { data } = await axios.get(`${base}/all?fields=${fields}`);
  return data;
}

export async function fetchCountryByCode(cca3) {
  const fields = "name,cca3,flags,population,region,capital,subregion,languages,currencies,borders";
  const { data } = await axios.get(`${base}/alpha/${cca3}?fields=${fields}`);
  return Array.isArray(data) ? data[0] : data;
}

export async function searchByName(query) {
  const fields = "name,cca3,flags,population,region,capital";
  const { data } = await axios.get(`${base}/name/${encodeURIComponent(query)}?fields=${fields}`);
  return data;
}

export async function filterByRegion(region) {
  const fields = "name,cca3,flags,population,region,capital";
  const { data } = await axios.get(`${base}/region/${encodeURIComponent(region)}?fields=${fields}`);
  return data;
}
