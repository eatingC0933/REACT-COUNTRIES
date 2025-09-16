
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAllCountries, searchByName, filterByRegion } from "../api/countries";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import useFavorites from "../hooks/useFavorites";

export default function Home() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  const loadAll = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetchAllCountries();
      setData(res);
      setStatus(res.length ? "success" : "empty");
    } catch {
      setStatus("error");
      setError("Failed to load countries. Please try again.");
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleSearch = useCallback(async (q) => {
    if (!q) return loadAll();
    setStatus("loading");
    setError("");
    try {
      const res = await searchByName(q);
      setData(res);
      setStatus(res.length ? "success" : "empty");
    } catch {
      setStatus("empty");
      setData([]);
    }
  }, [loadAll]);

  const handleRegion = useCallback(async (region) => {
    if (!region) return loadAll();
    setStatus("loading");
    setError("");
    try {
      const res = await filterByRegion(region);
      setData(res);
      setStatus(res.length ? "success" : "empty");
    } catch {
      setStatus("empty");
      setData([]);
    }
  }, [loadAll]);

  const list = useMemo(() => data, [data]);

  return (
    <section>
      <SearchBar onSearch={handleSearch} onRegion={handleRegion} />
      {status === "loading" && <p role="status">Loading…</p>}
      {status === "error" && <p role="alert">{error}</p>}
      {status === "empty" && <p>No countries found.</p>}
      {status === "success" && (
        <div className="grid">
          {list.map((c) => (
            <CountryCard
              key={c.cca3}
              country={c}
              isFav={isFavorite(c.cca3)}
              onToggleFav={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
