import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, onRegion }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const id = setTimeout(() => onSearch(query.trim()), 400);
    return () => clearTimeout(id);
  }, [query, onSearch]);

  useEffect(() => {
    onRegion(region);
  }, [region, onRegion]);

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">All regions</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </div>
  );
}
