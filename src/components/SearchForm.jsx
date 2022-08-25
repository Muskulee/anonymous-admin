import React, { useState } from "react";
import { useSearch } from "../context/SearchProvider";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const {handleSearch} = useSearch();

    const handleSubmit = (e) => {

        e.preventDefault();
       if(!query.trim()) return;
        handleSearch(query);
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search..."
        className="border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-teal-500 w-56"
      />
    </form>
  );
}
