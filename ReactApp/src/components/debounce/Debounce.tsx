import React, { useState, useEffect } from "react";

function Debounce() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("API call for:", query);
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(handler); // Cleanup previous timer
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

export default Debounce;
