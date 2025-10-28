export default function Header({ title }) {
  const showTitle = title && title.trim().length > 0;

  return (
    <header>
      {showTitle ? <h1>{title}</h1> : <h1>No title provided</h1>}
    </header>
  );
}

  