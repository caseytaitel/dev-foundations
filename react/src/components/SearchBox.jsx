export default function SearchBox({ query, onChange }) {
    return (
      <input
        type="search"
        placeholder="Search items"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  