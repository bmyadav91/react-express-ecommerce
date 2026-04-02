import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchUI = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState<string>(initialQuery);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const trimQuery = query.trim();
    if (!trimQuery) return;

    navigate(`/?q=${encodeURIComponent(trimQuery)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        margin: "5px 0",
      }}
    >
      <input
        type="text"
        name="search"
        placeholder="Search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
    </form>
  );
};