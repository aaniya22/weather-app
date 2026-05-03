import { getPosterUrl } from "../api/tmdb";

export default function MediaCard({ item }) {
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const type = item.media_type === "movie" ? "Movie" : "TV Show";
  const poster = getPosterUrl(item.poster_path);

  return (
    <div className="card">
      <div className="card-poster">
        {poster ? (
          <img src={poster} alt={title} loading="lazy" />
        ) : (
          <div className="card-no-poster">No Image</div>
        )}
        <span className="card-type">{type}</span>
      </div>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <span className="card-year">{year}</span>
      </div>
    </div>
  );
}