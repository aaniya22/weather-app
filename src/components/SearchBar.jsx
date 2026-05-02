function SearchBar({ city, onChange, onSearch, loading }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSearch();
  }

  return (
    <div className="search-row">
      <input
        className="search-input"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={onSearch}>
        {loading ? '...' : '→'}
      </button>
    </div>
  );
}

export default SearchBar;