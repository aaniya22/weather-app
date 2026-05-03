const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function searchMulti(query) {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    { headers }
  );
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results.filter((r) => r.media_type === "movie" || r.media_type === "tv");
}

export function getPosterUrl(path, size = "w342") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}