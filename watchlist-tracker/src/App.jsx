import { useState, useEffect, useCallback } from "react";
import { searchMulti } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import ResultsGrid from "./components/ResultsGrid";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMulti(searchQuery);
      setResults(data);
    } catch (err) {
      setError("Something went wrong. Check your API key.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">🎬 Cinetrack</h1>
          <p className="tagline">Your personal watchlist</p>
        </div>
      </header>
      <main className="main">
        <SearchBar query={query} onChange={setQuery} />
        {error && <p className="error">{error}</p>}
        {loading && <p className="status">Searching...</p>}
        {!loading && results.length === 0 && query && (
          <p className="status">No results for "{query}"</p>
        )}
        {!loading && results.length === 0 && !query && (
          <p className="status empty-state">Search for a movie or show to get started</p>
        )}
        <ResultsGrid results={results} />
      </main>
    </div>
  );
}