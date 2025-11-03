export default function ItemList({ items, query }) {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter(i => i.toLowerCase().includes(q)) : items;
  
    if (!filtered.length) return <p>No results.</p>;
    return (
      <ul>
        {filtered.map((i) => <li key={i}>{i}</li>)}
      </ul>
    );
  }
  