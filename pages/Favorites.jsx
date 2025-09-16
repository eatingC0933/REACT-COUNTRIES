import { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import { fetchAllCountries } from "../api/countries";
import CountryCard from "../components/CountryCard";

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        const all = await fetchAllCountries();
        setData(all.filter((c) => favorites.includes(c.cca3)));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
    load();
  }, [favorites]);

  if (status === "loading") return <p role="status">Loading…</p>;
  if (status === "error") return <p role="alert">Failed to load favorites.</p>;
  if (!data.length) return <p>No favorites yet.</p>;

  return (
    <section>
      <h2>Favorites</h2>
      <div className="grid">
        {data.map((c) => (
          <CountryCard
            key={c.cca3}
            country={c}
            isFav={isFavorite(c.cca3)}
            onToggleFav={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
