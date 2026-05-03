import MediaCard from "./MediaCard";

export default function ResultsGrid({ results }) {
  if (results.length === 0) return null;
  return (
    <div className="results-grid">
      {results.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}