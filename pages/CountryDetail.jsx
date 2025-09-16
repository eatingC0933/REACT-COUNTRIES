import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode } from "../api/countries";
import useFavorites from "../hooks/useFavorites";
import FavoriteToggle from "../components/FavoriteToggle";

export default function CountryDetail() {
  const { id } = useParams(); // id = cca3
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus("loading");
      setError("");
      try {
        const res = await fetchCountryByCode(id);
        if (!cancelled) {
          setCountry(res);
          setStatus(res ? "success" : "empty");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setError("Country not found.");
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (status === "loading") return <p role="status">Loading…</p>;
  if (status === "error") return <p role="alert">{error}</p>;
  if (status === "empty" || !country) return <p>Country not found.</p>;

  const { name, flags, population, region, subregion, capital, languages, currencies, borders, cca3 } = country;

  return (
    <section className="detail">
      <Link to="/">← Back</Link>
      <div className="detail-body">
        <img className="flag-lg" src={flags?.svg || flags?.png} alt={`${name?.common} flag`} />
        <div className="info">
          <h2>{name?.common}</h2>
          <FavoriteToggle id={cca3} isFav={isFavorite(cca3)} onToggle={toggleFavorite} />
          <ul className="meta">
            <li><strong>Official name:</strong> {name?.official}</li>
            <li><strong>Population:</strong> {population?.toLocaleString()}</li>
            <li><strong>Region:</strong> {region}</li>
            <li><strong>Subregion:</strong> {subregion ?? "—"}</li>
            <li><strong>Capital:</strong> {capital?.[0] ?? "—"}</li>
            <li><strong>Languages:</strong> {languages ? Object.values(languages).join(", ") : "—"}</li>
            <li><strong>Currencies:</strong> {currencies ? Object.values(currencies).map(c=>c.name).join(", ") : "—"}</li>
            <li>
              <strong>Borders:</strong>{" "}
              {borders?.length ? borders.map((b) => <Link key={b} to={`/item/${b}`}>{b}</Link>) : "—"}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
