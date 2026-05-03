import { Search } from "lucide-react";

export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-wrapper">
      <Search className="search-icon" size={20} />
      <input
        className="search-input"
        type="text"
        placeholder="Search movies & shows..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </div>
  );
}