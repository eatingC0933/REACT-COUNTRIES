import { Link } from "react-router-dom";
import FavoriteToggle from "./FavoriteToggle";

export default function CountryCard({ country, onToggleFav, isFav }) {
  const { cca3, name, flags, population, region, capital } = country;
  return (
    <article className="card">
      <img className="flag" src={flags?.svg || flags?.png} alt={`${name?.common} flag`} />
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/item/${cca3}`}>{name?.common}</Link>
        </h3>
        <ul className="meta">
          <li><strong>Population:</strong> {population.toLocaleString()}</li>
          <li><strong>Region:</strong> {region}</li>
          <li><strong>Capital:</strong> {capital?.[0] ?? "—"}</li>
        </ul>
        <FavoriteToggle id={cca3} isFav={isFav} onToggle={onToggleFav} />
      </div>
    </article>
  );
}
