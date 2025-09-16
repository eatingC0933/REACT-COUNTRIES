export default function FavoriteToggle({ id, isFav, onToggle }) {
  return (
    <button
      className={`fav-btn ${isFav ? "active" : ""}`}
      aria-pressed={isFav}
      onClick={() => onToggle(id)}
    >
      {isFav ? "★ Remove favorite" : "☆ Add favorite"}
    </button>
  );
}
